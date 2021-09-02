import createGuid from '.';

describe('Create Guid', () => {
    it('starts at 1000 and increments', () => {
        expect(createGuid()).toEqual(1000);
        expect(createGuid()).toEqual(1001);
        expect(createGuid()).toEqual(1002);
    });
});
