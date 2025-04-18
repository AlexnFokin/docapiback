import UserRepository from '../repositories/user.repository';
import { AuthDTO, UserCreateDTO, UserResponseDTO } from '../types/user';
import { compareSync, hashSync } from 'bcrypt-ts';
import { v4 as uuidv4 } from 'uuid';
import { EmailService } from './email.service';
import { TokenService } from './token.service';
import { api_url } from '../config/config';
import { NotFoundException, BadRequestException, AuthorizationError } from '../exceptions/http.exception';

class AuthService {
    private userRepository: UserRepository;
    emailService;
    tokenService: TokenService;

    constructor() {
        this.userRepository = new UserRepository();
        this.emailService = new EmailService();
        this.tokenService = new TokenService();
    }

    public async register({ email, password, name }: UserCreateDTO): Promise<{ accessToken: string, refreshToken: string, user: UserResponseDTO }> {
        const existingUser = await this.userRepository.findByEmail(email);

        if (existingUser) {
            throw new BadRequestException('User already exists');
        }

        const hashedPassword = await hashSync(password, 10);
        const activationLink = uuidv4();

        const user = await this.userRepository.create({
            email,
            name,
            password: hashedPassword,
            activationLink: activationLink,
        });

        await this.emailService.sendActivationEmail(email, `${api_url}/api/auth/activate/${activationLink}`);

        const userDto: UserResponseDTO = {
            id: user.id,
            email: user.email,
            role: user.role,
            activated: user.isActivated,
        };

        const tokens = this.tokenService.generateTokens({ ...userDto });
        await this.tokenService.saveToken(user.id, tokens.refreshToken);

        return {
            ...tokens,
            user: userDto
        };
    }

    public async login({ email, password }: AuthDTO): Promise<{ accessToken: string, refreshToken: string, user: UserResponseDTO }> {
        const user = await this.userRepository.findByEmail(email);

        if (!user) {
            throw new BadRequestException('Invalid credentials');
        }

        const isMatch = await compareSync(password, user.password);

        if (!isMatch) {
            throw new BadRequestException('Invalid credentials');
        }


        const userDto: UserResponseDTO = {
            id: user.id,
            email: email,
            role: user.role
        };

        const tokens = this.tokenService.generateTokens({...userDto})

        await this.tokenService.saveToken(userDto.id, tokens.refreshToken)
        return {...tokens, user: userDto}
    }

    public async activate(activationLink: string) {
        const user = await this.userRepository.findByActivationLink(activationLink);

        if (!user) {
            throw new NotFoundException('Incorrect activation link');
        }

        user.isActivated = true;
        const updatedUser = await this.userRepository.update(user.id, { isActivated: true });

        if (!updatedUser) {
            throw new BadRequestException('Failed to update user activation status');
        }

        await this.emailService.sendSuccessActivationLetter(user.email);
        return updatedUser;
    }

    public async logout(refreshToken: string) {
        const token = await this.tokenService.removeToken(refreshToken);
        return token;
    }

    public async refresh(refreshToken: string) {
        if (!refreshToken) {
            throw new AuthorizationError('Authorization Error');
        }

        const userData = await this.tokenService.validateRefreshToken(refreshToken);
 
        if (!userData) {
            throw new AuthorizationError('Authorization Error');
        }

        const tokenFromDb = await this.tokenService.getToken(refreshToken);

        if (!tokenFromDb) {
            throw new AuthorizationError('Authorization Error');
        }

        const user = await this.userRepository.findById(userData.id);

        if (!user) {
            throw new AuthorizationError('User not found');
        }

        const userDto: UserResponseDTO = {
            id: user.id,
            email: user.email,
            role: user.role
        };
    
        const tokens = this.tokenService.generateTokens({ ...userDto });

        await this.tokenService.saveToken(userDto.id, tokens.refreshToken);
    
        return { ...tokens, user: userDto };
    }

    public async getUsers() {
        return this.userRepository.getAll();
    }
}

export default AuthService;
