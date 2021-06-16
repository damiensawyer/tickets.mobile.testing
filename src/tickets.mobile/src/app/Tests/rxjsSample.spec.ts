import {interval, lastValueFrom, of, pipe, from, firstValueFrom} from 'rxjs';


describe('RXjs Sample Tests', () => {
    it('sample of testing rxjs', async () => {
        let o$ = from([1,2,3])
        await expect(lastValueFrom(o$)).resolves.toEqual(3);
        await expect(firstValueFrom(o$)).resolves.toEqual(1);
    });
})


