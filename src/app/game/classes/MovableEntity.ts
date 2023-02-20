export class MoveableEntity {
    outOfBoundsError = new Error("Can't move out of bounds");
    readonly mapWidth = 10;
    readonly mapHeight = 10;
    constructor (
        private x: number,
        private y: number) { }
    
    private moveUp(): void {
        if (this.y > 0) {
            this.y--;
            console.log('moved player up to: ' + this.x + ', ' + this.y);
        } else {
            throw this.outOfBoundsError;
        }
    }

    private moveDown(): void {
        if (this.y < 9) {
            this.y++;
        } else {
            throw this.outOfBoundsError;
        }
    }

    private moveLeft(): void {
        if (this.x > 0) {
            this.x--;
        } else {
            throw this.outOfBoundsError;
        }
    }

    private moveRight(): void {
        if (this.x < 9) {
            this.x++;
        } else {
            throw this.outOfBoundsError;
        }
    }

    getPosition(): { x: number, y: number } {
        return { x: this.x, y: this.y };
    }

    move(direction: string): void {
        switch(direction) {
            case 'up':
                this.moveUp();
                break;
            case 'down':
                this.moveDown();
                break;
            case 'left':
                this.moveLeft();
                break;
            case 'right':
                this.moveRight();
                break;
        }
    }
}