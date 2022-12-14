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

    kocka(stranica){
        this.postaviNa(stranica, 0, 0);
        this.linijaDo(stranica, stranica, 0);
        this.linijaDo(0, stranica, 0);
        this.linijaDo(0, 0, 0);
        this.linijaDo(stranica, 0, 0);
        this.linijaDo(stranica, 0, stranica);
        this.linijaDo(stranica, stranica, stranica);
        this.linijaDo(0, stranica, stranica);
        this.linijaDo(0, 0, stranica);
        this.linijaDo(stranica, 0, stranica);
        this.povuciLiniju();//gornja i donja ploha povezana jednim bridom
        this.postaviNa(stranica, stranica, stranica);
        this.linijaDo(stranica, stranica, 0);
        this.povuciLiniju();
        this.postaviNa(0, stranica, stranica);
        this.linijaDo(0, stranica, 0);
        this.povuciLiniju();
        this.postaviNa(0, 0, stranica);
        this.linijaDo(0, 0, 0);
        this.povuciLiniju();
    }

    stozac(r, h, n){
        var v1=r * Math.cos(0);
        var v2=r * Math.sin(0);
        this.postaviNa(v1, 0, v2);
        for (let ?? = 0; ?? < 2*Math.PI+1; ?? += 2 * Math.PI / (n + 1)){
            var vr1=r * Math.cos(??);
            var vr2=r * Math.sin(??);
            this.linijaDo(vr1, 0, vr2);
            this.linijaDo(0, h, 0);
            this.povuciLiniju();
            this.linijaDo(vr1, 0, vr2);
        }
    }

    valjak(r, h, n) {
        var t1 = r * Math.cos(0);
        var t2 = r * Math.sin(0);
        this.postaviNa(t1, 0, t2);
        for (let ?? = 0; ?? < 2 * Math.PI + 1; ?? += 2 * Math.PI / (n + 1)) {
            var t1 = r * Math.cos(??);
            var t2 = r * Math.sin(??);
            this.linijaDo(t1, 0, t2);
            this.linijaDo(t1, h, t2);
            this.povuciLiniju();
            this.postaviNa(t1, 0, t2);
        }

        this.postaviNa(r * Math.cos(0), h, r * Math.sin(0));
        for (let ?? = 0; ?? < 2 * Math.PI + 1; ?? += 2 * Math.PI / (n + 1)) {
            var t1 = r * Math.cos(??);
            var t2 = r * Math.sin(??);
            this.linijaDo(t1, h, t2);
            this.povuciLiniju();
        }
    }

    sfera(r, m, n) {
        var pomak = 0.05;
        //S vanjskom petljom mijenjamo vrijednost parametra ?? s pomakom 2??/m unutar intervala [0, 2??>.
        for (var ?? = 0; ?? <= 2 * Math.PI; ?? += 2 * Math.PI / m) {
            var t1 = r * Math.cos(??) * Math.sin(0);
            var t2 = r * Math.sin(??) * Math.sin(0);
            var t3 = r * Math.cos(0);
            this.postaviNa(t1, t3, t2);
            //Za svaku takvu fiksnu vrijednost parametra ?? crtamo meridijan tako da s unutarnjom petljom s odredenim pomakom mijenjamo vrijednost parametra ?? unutar segmenta [0, ??]
            for (var ?? = 0; ?? <= Math.PI + 1; ?? += pomak) {
                var t1_crtano = r * Math.cos(??) * Math.sin(??);
                var t2_crtano = r * Math.sin(??) * Math.sin(??);
                var t3_crtano = r * Math.cos(??);
                this.linijaDo(t1_crtano, t3_crtano, t2_crtano);
                this.povuciLiniju();
            }
        }
        //S vanjskom petljom mijenjamo vrijednost parametra ?? s pomakom ??/n+1 unutar intervala <0, ??>. 
        for (let ?? = 0; ?? <= Math.PI; ?? += Math.PI / (n + 1)) {
            var t1 = r * Math.cos(0) * Math.sin(??);
            var t2 = r * Math.sin(0) * Math.sin(??);
            var t3 = r * Math.cos(??);
            this.postaviNa(t1_crtano, t3_crtano, t2_crtano);
            //Za svaku takvu fiksnu vrijednost parametra ?? crtamo paralelu tako da s unutarnjom petljom s odredenim pomakom mijenjamo vrijednost parametra ?? unutar segmenta [0, 2??]
            for (let ?? = 0; ?? <= 2 * Math.PI + 1; ?? += pomak) {
                var t1_crtano = r * Math.cos(??) * Math.sin(??);
                var t2_crtano = r * Math.sin(??) * Math.sin(??);
                var t3_crtano = r * Math.cos(??);
                this.linijaDo(t1_crtano, t3_crtano, t2_crtano);
                this.povuciLiniju();
            }
        }
        this.povuciLiniju();
    }

    polusfera(r, m, n) {
        var pomak = 0.05;
        //S vanjskom petljom mijenjamo vrijednost parametra ?? s pomakom 2??/m unutar intervala [0, ??>.
        for (var ?? = 0; ?? <= r*Math.PI; ?? += 2 * Math.PI / m) {
            var t1 = r * Math.cos(??) * Math.sin(0)
            var t2 = r * Math.sin(??) * Math.sin(0)
            var t3 = r * Math.cos(0)
            this.postaviNa(t1, t3, t2);
            //Za svaku takvu fiksnu vrijednost parametra ?? crtamo meridijan tako da s unutarnjom petljom s odredenim pomakom mijenjamo vrijednost parametra ?? unutar segmenta [0, ??]
            for (var ?? = 0; ?? <= r*Math.PI; ?? += pomak) {
                var t1_crtano = r * Math.cos(??) * Math.sin(??);
                var t2_crtano = r * Math.sin(??) * Math.sin(??);
                var t3_crtano = r * Math.cos(??);
                this.linijaDo(t1_crtano, t3_crtano, t2_crtano);
                this.povuciLiniju();
            }
        }
        //S vanjskom petljom mijenjamo vrijednost parametra ?? s pomakom ??/n+1 unutar intervala <0, ??>. 
        for (var ?? = 0; ?? <= r*Math.PI; ?? += Math.PI / (n + 1)) {
            var t1 = r * Math.cos(0) * Math.sin(??);
            var t2 = r * Math.sin(0) * Math.sin(??);
            var t3 = r * Math.cos(??);
            this.postaviNa(t1, t3, t2);
            //Za svaku takvu fiksnu vrijednost parametra ?? crtamo paralelu tako da s unutarnjom petljom s odredenim pomakom mijenjamo vrijednost parametra ?? unutar segmenta [0, ??]
            for (var ?? = 0; ?? <= r*Math.PI; ?? += pomak) {
                var t1_crtano = r * Math.cos(??) * Math.sin(??);
                var t2_crtano = r * Math.sin(??) * Math.sin(??);
                var t3_crtano = r * Math.cos(??);
                this.linijaDo(t1_crtano, t3_crtano, t2_crtano);
                this.povuciLiniju();
            }
        }
        this.povuciLiniju();
    }
}