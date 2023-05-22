import * as jwt from 'jsonwebtoken';

export const mockJwtService = {
  sign: jest.fn(() => 'mocked_token'),
  verify: jest.fn(() => ({ id: 1, username: 'mocked_user' })),
};

jest.mock('jsonwebtoken', () => ({
  __esModule: true,
  ...jest.requireActual('jsonwebtoken'),
  sign: mockJwtService.sign,
  verify: mockJwtService.verify,
}));

export default mockJwtService;
