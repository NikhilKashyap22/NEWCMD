import { DoctorNameFormatterPipe } from './doctor-name-formatter.pipe';

describe('DoctorNameFormatterPipe', () => {
  it('create an instance', () => {
    const pipe = new DoctorNameFormatterPipe();
    expect(pipe).toBeTruthy();
  });
});
