import UserRepository from '../repositories/user.repository';
import { AuthDTO, UserCreateDTO } from '../types/user';
import { generateToken } from '../utils/jwt';
import { compareSync, hashSync } from 'bcrypt-ts';
import { v4 as uuidv4 } from 'uuid';
import { EmailService } from './email.service';
import { TokenService } from './token.service';
import { User } from '@prisma/client';
import { api_url } from '../config/config';

class AuthService {
    private userRepository: UserRepository;
    emailService;
    tokenService: TokenService;

    constructor() {
        this.userRepository = new UserRepository();
        this.emailService = new EmailService();
        this.tokenService = new TokenService();
    }

    public async register({ email, password, name}: UserCreateDTO): Promise<{accessToken: string, refreshToken: string, user: User}> {
        const existingUser = await this.userRepository.findByEmail(email);
        if (existingUser) throw new Error('User already exists');

        const hashedPassword = await hashSync(password, 10);

        const activationLink = uuidv4();

        const user = await this.userRepository.create({
            email,
            name,
            password: hashedPassword,
            activationLink: activationLink,
        });

        await this.emailService.sendActivationEmail(email, `${api_url}/api/auth/activate/${activationLink}`);
        const userDto = {
            id: user.id,
            email: email,
            role: user.role,
            activated: false,
        };
        const tokens = this.tokenService.generateTokens({ ...userDto });
        await this.tokenService.saveToken(user.id, tokens.refreshToken);

        return {
            ...tokens,
            user
        }
    }

    public async login({ email, password }: AuthDTO): Promise<string> {
        const user = await this.userRepository.findByEmail(email);
        if (!user) throw new Error('Invalid credentials');

        const isMatch = await compareSync(password, user.password);
        if (!isMatch) throw new Error('Invalid credentials');

        return generateToken({ id: user.id, email: user.email });
    }

    public async activate(activationLink: string) {
        const user = await this.userRepository.findByActivationLink(activationLink);

        if (!user) {
            throw new Error('incorrect activation link')
        }

        user.isActivated = true
        const updatedUser = await this.userRepository.update(user.id, {isActivated: true})
        
        if (updatedUser) {
            await this.emailService.sendSuccessActivationLetter(user.email);
        } else {
            throw new Error('Failed to update user activation status');
        }

        return updatedUser;
    }
}

export default AuthService;
