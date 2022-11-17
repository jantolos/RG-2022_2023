class GKS{
    constructor(platno, x_min, x_max, y_min, y_max){
        this.platno = platno
        this.x_min = x_min;
        this.x_max = x_max;
        this.y_min = y_min;
        this.y_max = y_max;
        this.brojac_pomak = 0;
    };

    postaviNa(x, y){
        var pl = document.getElementById(this.platno);
        var w = pl.width;
        var h = pl.height;
        var g = pl.getContext("2d");

        var s_x = (w-0)/(this.x_max - this.x_min);
        var s_y = (0-h)/(this.y_max - this.y_min);
        var p_x = -s_x*this.x_min;
        var p_y = -s_y*this.y_max;
        var x_crtano = (s_x*x)+p_x;
        var y_crtano = (s_y*y)+p_y;
        if (this.brojac_pomak == 0) {
            g.beginPath();
            g.moveTo(x_crtano, y_crtano);
            this.brojac_pomak += 1;
        }
        else{
            g.moveTo(x_crtano, y_crtano);
            this.brojac_pomak += 1;
        }
    };
    linijaDo(x, y){
        var pl = document.getElementById(this.platno);
        var w = pl.width;
        var h = pl.height;
        var g = pl.getContext("2d");

        var s_x = (w-0)/(this.x_max - this.x_min);
        var s_y = (0-h)/(this.y_max - this.y_min);
        var p_x = -s_x*this.x_min;
        var p_y = -s_y*this.y_max;
        var x_crtano = (s_x*x)+p_x;
        var y_crtano = (s_y*y)+p_y;
        g.lineTo(x_crtano, y_crtano);
        
    };
    koristiBoju(c){
        var pl = document.getElementById(this.platno);
        var g = pl.getContext("2d");

        g.strokeStyle = c;
    };
    povuciLiniju(){
        var pl = document.getElementById(this.platno)
        var g = pl.getContext("2d");
        g.stroke();
    };

    crtajKoordinatni(){

        var pl = document.getElementById(this.platno);
        var w = pl.width;
        var h = pl.height;
        var g = pl.getContext("2d");

        g.font = "20px Times New Roman";
        g.fillStyle = "black";
        g.textAlign = "center";

        this.postaviNa(0, this.y_max);
        this.linijaDo(0, this.y_min);
        this.postaviNa(this.x_max, 0);
        this.linijaDo(this.x_min, 0);
        this.povuciLiniju();
        let z=w/(this.x_max-this.x_min);
        for (let j = this.x_max - 1; j > this.x_min; j-=1) {
            this.postaviNa(j, 0+0.1);
            this.linijaDo(j, 0-0.1);
            this.povuciLiniju();
            if (j != 0) {
                g.fillText(j, w-z, h/1.8);
                z=z+(w/(this.y_max-this.y_min)) ;
            }
            else{
                z=z+(w/(this.y_max-this.y_min));
            }
        }
        let f=h/(this.y_max-this.y_min);
        for (let k = this.y_max - 1; k > this.y_min; k-=1) {
            this.postaviNa(0+0.1, k);
            this.linijaDo(0-0.1, k);
            this.povuciLiniju();
            if (k != 0) {
                g.fillText(-k, w/1.8, h-f);
                f=f+(h/(this.y_max-this.y_min));
            }
            else{
                f=f+(h/(this.y_max-this.y_min));
            }
        }
    }

    nazivCrteza(naziv){
        var pl = document.getElementById(this.platno);
        var w = pl.width;
        var h = pl.height;
        var g = pl.getContext("2d");

        g.font = "60px Verdana, Tahoma, sans-serif";
        g.fillStyle = "lightblue";
        g.textAlign = "right";
        g.fillText(naziv, w-15, h-15);
    }
}