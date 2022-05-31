import { Math } from './Math';

describe('Testando lib de matematica', () => {

    beforeAll(() => {
        //antes de de todos teste
    });

    afterAll(() => {
        //depois de de todos teste
    });

    beforeEach(() => {
        //antes de cada teste execute esse
    });

    afterEach(() => {
        //depois de cada  teste execute esse
    });

    it('Sumarizar os function SUM', () => {
        const result = Math.sum(5,10);
        expect(result).toBe(15);
     });
     
     
     it('Subritação da function SUB', () => {
         const result = Math.sub(5,10);
         expect(result).toBe(-5);
     });
     
     it('Multiplicação da function mut', () => {
         const result = Math.mut(3,5);
         expect(result).toBe(15);
     });
     
     it('Divisão da function div', () => {
         const result = Math.div(2,2);
         expect(result).toBe(1);
     
         const result2 = Math.div(3,0);
         expect(result2).toBe(false);
     });

     it.only('Contador de caracteres!', () => {
        const result2 = 'JVBBQ'
        expect(result2).toHaveLength(5);
    });
})
