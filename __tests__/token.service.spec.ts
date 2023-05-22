import { JwtService } from '@nestjs/jwt';
jest.mock('@nestjs/jwt');
import { TokenService } from '../src/petitions/util/token.service';

describe('TokenService', () => {
  let tokenService: TokenService;
  let jwtServiceMock: jest.Mocked<JwtService>;

  beforeEach(() => {
    jwtServiceMock = new JwtService() as jest.Mocked<JwtService>;
    tokenService = new TokenService(jwtServiceMock);
  });

  it('should generate a token', () => {
    jwtServiceMock.sign.mockReturnValue('signedToken');
    const result = tokenService.generateToken();
    expect(jwtServiceMock.sign).toHaveBeenCalled();
    expect(result).toEqual({
      signedToken: 'signedToken',
      token: expect.any(String)
    });
  });

  it('should verify a token', () => {
    const signedToken = 'signedToken';
    const token = 'token';
    jwtServiceMock.verify.mockReturnValue({ token });
    const result = tokenService.verifyToken(signedToken, token);
    expect(jwtServiceMock.verify).toHaveBeenCalledWith(signedToken);
    expect(result).toEqual({ status: true });
  });
});
