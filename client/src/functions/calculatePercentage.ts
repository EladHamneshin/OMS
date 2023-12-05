export default function calculatePercentage(totalOrders: number, specificOrders: number): number {

    return (specificOrders / totalOrders) * 100;
}