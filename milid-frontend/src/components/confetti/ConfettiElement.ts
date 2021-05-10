
import { Confetti } from './Confetti';

export class ConfettiElement
{

    canvas!: HTMLCanvasElement | null;
    confetti!: Confetti | null;

    mounted = false;
    
    get pixelRatio(): number {
        return window.devicePixelRatio || 1;
    }

    mount(){
        if(this.mounted) return;
    
        this.canvas = document.createElement('canvas');
        this.canvas.style.position = 'fixed';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.canvas.style.zIndex = '30';
        this.canvas.style.pointerEvents = 'none';
        this.canvas = document.body.appendChild(this.canvas);

        const width = window.innerWidth;
        const height = window.innerHeight;
        this.canvas.width = Math.floor(width * this.pixelRatio);
        this.canvas.height = Math.floor(height * this.pixelRatio);

        this.mounted = true;
        //
        // options
        // https://github.com/alampros/react-confetti#props
        this.confetti = new Confetti(this.canvas, {
            numberOfPieces:300,
            recycle:false
        }) as Confetti;

        setTimeout(()=>this.stop(),8000);
    }

    stop(){
        if(this.confetti){
            this.confetti.stop();
        }
    }

    unmount(){
        if(!this.mounted) return;

        this.stop();

        if(this.canvas){
            document.body.removeChild(this.canvas);
        }

        this.mounted = false;
    }
}