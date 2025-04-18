import UserRepository from '../repositories/user.repository';
import { AuthDTO } from '../types/user';
import { generateToken } from '../utils/jwt';
import { compareSync, hashSync } from 'bcrypt-ts';
import { v4 as uuidv4 } from 'uuid';
import { EmailService } from './email.service';
import { TokenService } from './token.service';

class AuthService {
    private userRepository: UserRepository;
    emailService;
    tokenService: TokenService;

    constructor() {
        this.userRepository = new UserRepository();
        this.emailService = new EmailService();
        this.tokenService = new TokenService();
    }

    public async register({ email, password }: AuthDTO): Promise<string> {
        const existingUser = await this.userRepository.findByEmail(email);
        if (existingUser) throw new Error('User already exists');

        const hashedPassword = await hashSync(password, 10);

        const activationLink = uuidv4();

        const user = await this.userRepository.create({
            email,
            password: hashedPassword,
            activationLink: activationLink,
        });

        await this.emailService.sendActivationEmail(email, activationLink);
        const userDto = {
            id: user.id,
            email: email,
            role: user.role,
            activated: false,
        };
        const tokens = this.tokenService.generateTokens({ ...userDto });
        await this.tokenService.saveToken(user.id, tokens.refreshToken);
        return generateToken({ id: user.id, email: user.email });
    }

    public async login({ email, password }: AuthDTO): Promise<string> {
        const user = await this.userRepository.findByEmail(email);
        if (!user) throw new Error('Invalid credentials');

        const isMatch = await compareSync(password, user.password);
        if (!isMatch) throw new Error('Invalid credentials');

        return generateToken({ id: user.id, email: user.email });
    }
}

export default AuthService;
