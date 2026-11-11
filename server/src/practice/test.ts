type Service = {
    id: number; 
    name: string;
    priceCents: number;
    durationMin: number;
}

const services = [
  { id: 1, name: "Haircut", priceCents: 2500, totalTime: 30 },
  { id: 2, name: "Beard trim", priceCents: 1200, totalTime: 15 },
  { id: 3, name: "Combo", priceCents: 3500, totalTime: 45 },
];

// function formatPrice(cents: number) : string {
    // let price = cents;
    
    
// }

function formatPrice(cents: number): string {
  const dollars = cents / 100;
  return `$${dollars.toFixed(2)}`;
}

function totalDuration(services: Service[]) : number {
    let total = 0;
    for ( const s of services ) {
        total += s.durationMin;
    } 
    return total;
}

console.log(formatPrice(2500)); // $25.00
console.log(formatPrice(1250)); // $12.50
console.log(formatPrice(5));    // $0.05

