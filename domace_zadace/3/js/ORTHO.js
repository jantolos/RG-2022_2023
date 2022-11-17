class Ortho {
    _matrica;

    constructor(platno, xmin, xmax, ymin, ymax) {
        this.platno = platno;
        this.xmin = xmin;
        this.xmax = xmax;
        this.ymin = ymin;
        this.ymax = ymax;
        this.w = platno.width;
        this.h = platno.height;
        this.g = platno.getContext("2d");
        this.g.font = "20px Times New Roman";
        this.g.fillStyle = "black";
        this.g.textAlign = "center";
        this.faktorSkaliranja();
        this.izracunajPomake();
        this._matrica = [[1, 0, 0, 0], [0, 1, 0, 0], [0, 0, 1, 0], [0, 0, 0, 1]];
    }

    faktorSkaliranja() {
        this.sx = this.w / (this.xmax - this.xmin);
        this.sy = -this.h / (this.ymax - this.ymin);
    }

    izracunajPomake() {
        this.px = -this.sx * this.xmin;
        this.py = -this.sy * this.ymax;
    }

    trans(m) {
        this._matrica = m.dohvatiMatricu();
    }

    koristiBoju(c) {
        this.g.strokeStyle = c;
    }

    povuciLiniju() {
        this.g.stroke();
    }

    postaviNa(x, y, z) {
        var [transX, transY] = this.transformiraj(x, y, z);
        var [x_crtano, y_crtano] = this.transKoordinate(transX, transY);
        this.g.beginPath();
        this.g.moveTo(x_crtano, y_crtano);
    }

    linijaDo(x, y, z) {
        var [transX, transY] = this.transformiraj(x, y, z);
        var [x_crtano, y_crtano] = this.transKoordinate(transX, transY);
        this.g.lineTo(x_crtano, y_crtano);
    }

    transformiraj(x, y, z) {
        var transX = this._matrica[0][0] * x + this._matrica[0][1] * y + this._matrica[0][2] * z + this._matrica[0][3];
        var transY = this._matrica[1][0] * x + this._matrica[1][1] * y + this._matrica[1][2] * z + this._matrica[1][3];
        return [transX, transY];
    }

    transKoordinate(x, y) {
        var x_crtano = this.sx * x + this.px;
        var y_crtano = this.sy * y + this.py;
        return [x_crtano, y_crtano];
    }

    ocisti() {
        this.g.clearRect(0, 0, this.platno.width, this.platno.height);
    }
}