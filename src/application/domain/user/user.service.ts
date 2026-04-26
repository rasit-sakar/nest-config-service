import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { CreateUserInput } from '../../contracts/create-user';
import { UpdateUserInput } from '../../contracts/update-user.model';
import { SignJWT } from 'jose';
import { UserContext } from './models/user-context';
import { AppConfig } from '../../../infrastructure/config/app.config';
import { ConfigService } from '@nestjs/config';
import { AuthenticateInput } from '../../contracts/authenticate.model';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly configService: ConfigService,
  ) {}
  findUserByUsername(username: string) {
    return this.userRepository.findUserByUsername(username);
  }

  createUser(createUserInput: CreateUserInput) {
    return this.userRepository.createUser(createUserInput);
  }

  updateUser(username: string, updateUserInput: UpdateUserInput) {
    return this.userRepository.updateUser(username, updateUserInput);
  }

  deleteUser(username: string) {
    return this.userRepository.deleteUser(username);
  }

  async verifyAuthToken(username: string, secretKey: string, secretPassword: string): Promise<boolean> {
    const keys = await this.userRepository.getToken(username);
    return keys?.secretKey === secretKey && keys?.secretPassword === secretPassword;
  }

  async authenticate(authenticateInput: AuthenticateInput): Promise<{ jwtToken: string; expiredAt: Date } | null> {
    const user = await this.userRepository.findUserByUsername(authenticateInput.username);
    if (!user) return null;
    const isVerified = await this.verifyAuthToken(
      authenticateInput.username,
      authenticateInput.secretKey,
      authenticateInput.secretPassword,
    );
    if (!isVerified) {
      return null;
    }
    const appConfig = this.configService.get<AppConfig>('app');
    const userContext: UserContext = {
      userId: user.id,
      username: user.username,
      spaceAuths: user.spaceAuths,
      isAdmin: user.isAdmin,
    };
    const expiredAt = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes from now
    const jwtToken = await new SignJWT({ ...userContext })
      .setProtectedHeader({ alg: 'HS256' }) // Use EdDSA for asymmetric
      .setIssuedAt()
      .setSubject(authenticateInput.username)
      .setIssuer('https://your-auth-server.com')
      .setExpirationTime(expiredAt)
      .sign(new TextEncoder().encode(appConfig?.jwtSecret));
    return { jwtToken, expiredAt };
  }
}
