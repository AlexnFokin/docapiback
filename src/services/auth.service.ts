import UserRepository from '../repositories/user.repository';
import { AuthDTO } from '../types/user';
import { generateToken } from '../utils/jwt';
import { compareSync, hashSync } from 'bcrypt-ts';

class AuthService {
    private userRepository: UserRepository;

    constructor() {
        this.userRepository = new UserRepository();
    }

    public async register({ email, password }: AuthDTO): Promise<string> {
        const existingUser = await this.userRepository.findByEmail(email);
        if (existingUser) throw new Error('User already exists');

        const hashedPassword = await hashSync(password, 10);
        const user = await this.userRepository.create({
            email,
            password: hashedPassword,
        });
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
