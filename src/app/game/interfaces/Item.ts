export interface Item {
    name: string;
    description: string;
    type: string;
    attributes: { dmg: number, def: number, evade: number }; // buff or debuff
}