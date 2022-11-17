class Persp {
    _matrica;
    _dist;

    constructor(platno, xmin, xmax, ymin, ymax, d) {
        this.platno = platno;
        this.xmin = xmin;
        this.xmax = xmax;
        this.ymin = ymin;
        this.ymax = ymax;
        this._dist = d;
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
        this._matrica = m.mnoziMatrice(m._kamera, m._matrica);
    }

    koristiBoju(c) {
        this.g.strokeStyle = c;
    }

    povuciLiniju() {
        this.g.stroke();
    }

    postaviNa(x, y, z) {
        var [transX, transY, transZ] = this.transformiraj(x, y, z);
        var [projX, projY] = this.projiciraj(transX, transY, transZ);
        var [x_crtano, y_crtano] = this.transKoordinate(projX, projY);
        this.g.beginPath();
        this.g.moveTo(x_crtano, y_crtano);
    }

    linijaDo(x, y, z) {
        var [transX, transY, transZ] = this.transformiraj(x, y, z);
        var [projX, projY] = this.projiciraj(transX, transY, transZ);
        var [x_crtano, y_crtano] = this.transKoordinate(projX, projY);
        this.g.lineTo(x_crtano, y_crtano);
    }

    transformiraj(x, y, z) {
        var transX = this._matrica[0][0] * x + this._matrica[0][1] * y + this._matrica[0][2] * z + this._matrica[0][3];
        var transY = this._matrica[1][0] * x + this._matrica[1][1] * y + this._matrica[1][2] * z + this._matrica[1][3];
        var transZ = this._matrica[2][0] * x + this._matrica[2][1] * y + this._matrica[2][2] * z + this._matrica[2][3];
        return [transX, transY, transZ];
    }

    projiciraj(x, y, z) {
        var projX = -(this._dist / z) * x;
        var projY = -(this._dist / z) * y;
        return [projX, projY];
    }

    transKoordinate(x, y) {
        var x_crtano = this.sx * x + this.px;
        var y_crtano = this.sy * y + this.py;
        return [x_crtano, y_crtano];
    }

    ocisti() {
        this.g.clearRect(0, 0, this.platno.width, this.platno.height);
    }

    stozac(r, h, n){
        var v1=r * Math.cos(0);
        var v2=r * Math.sin(0);
        this.postaviNa(v1, 0, v2);
        for (let fi = 0; fi < 2*Math.PI+1; fi += 2 * Math.PI / (n + 1)){
            var vr1=r * Math.cos(fi);
            var vr2=r * Math.sin(fi);
            this.linijaDo(vr1, 0, vr2);
            this.linijaDo(0, h, 0);
            this.povuciLiniju();
            this.linijaDo(vr1, 0, vr2);
        }
    }

    valjak(r, h, n) {
        var p1 = r * Math.cos(0);
        var p2 = r * Math.sin(0);
        this.postaviNa(p1, 0, p2);
        for (let fi = 0; fi < 2 * Math.PI + 1; fi += 2 * Math.PI / (n + 1)) {
            var p1 = r * Math.cos(fi);
            var p2 = r * Math.sin(fi);
            this.linijaDo(p1, 0, p2);
            this.linijaDo(p1, h, p2);
            this.povuciLiniju();
            this.postaviNa(p1, 0, p2);
        }

        this.postaviNa(r * Math.cos(0), h, r * Math.sin(0));
        for (let fi = 0; fi < 2 * Math.PI + 1; fi += 2 * Math.PI / (n + 1)) {
            var p1 = r * Math.cos(fi);
            var p2 = r * Math.sin(fi);
            this.linijaDo(p1, h, p2);
            this.povuciLiniju();
        }
    }
}