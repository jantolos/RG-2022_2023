class MT3D {
    _matrica;

    constructor() {
        this.identitet();
    }

    dohvatiMatricu() {
        return this._matrica;
    }

    identitet() {
        this._matrica =
            [[1, 0, 0, 0],
            [0, 1, 0, 0],
            [0, 0, 1, 0],
            [0, 0, 0, 1]];
    }

    pomakni(px, py, pz) {
        var m =
            [[1, 0, 0, px],
            [0, 1, 0, py],
            [0, 0, 1, pz],
            [0, 0, 0, 1]];
        this.mult(m);
    }

    skaliraj(sx, sy, sz) {
        var m =
            [[sx, 0, 0, 0],
            [0, sy, 0, 0],
            [0, 0, sz, 0],
            [0, 0, 0, 1]];
        this.mult(m);
    }

    zrcaliNaX() {
        var m =
            [[1, 0, 0, 0],
            [0, -1, 0, 0],
            [0, 0, -1, 0],
            [0, 0, 0, 1]];
        this.mult(m);
    }

    zrcaliNaY() {
        var m =
            [[-1, 0, 0, 0],
            [0, 1, 0, 0],
            [0, 0, -1, 0],
            [0, 0, 0, 1]];
        this.mult(m);
    }

    zrcaliNaZ() {
        var m =
            [[-1, 0, 0, 0],
            [0, -1, 0, 0],
            [0, 0, 1, 0],
            [0, 0, 0, 1]];
        this.mult(m);
    }

    zrcaliNaXY() {
        var m =
            [[1, 0, 0, 0],
            [0, 1, 0, 0],
            [0, 0, -1, 0],
            [0, 0, 0, 1]];
        this.mult(m);
    }

    zrcaliNaXZ() {
        var m =
            [[1, 0, 0, 0],
            [0, -1, 0, 0],
            [0, 0, 1, 0],
            [0, 0, 0, 1]];
        this.mult(m);
    }

    zrcaliNaYZ() {
        var m =
            [[-1, 0, 0, 0],
            [0, 1, 0, 0],
            [0, 0, 1, 0],
            [0, 0, 0, 1]];
        this.mult(m);
    }

    rotirajX(kut) {
        let sinKut = Math.sin(kut);
        let cosKut = Math.cos(kut);
        var m =
            [[1, 0, 0, 0],
            [0, cosKut, -sinKut, 0],
            [0, sinKut, cosKut, 0],
            [0, 0, 0, 1]];
        this.mult(m);
    }

    rotirajY(kut) {
        let sinKut = Math.sin(kut);
        let cosKut = Math.cos(kut);
        var m =
            [[cosKut, 0, sinKut, 0],
            [0, 1, 0, 0],
            [-sinKut, 0, cosKut, 0],
            [0, 0, 0, 1]];
        this.mult(m);
    }

    rotirajZ(kut) {
        let sinKut = Math.sin(kut);
        let cosKut = Math.cos(kut);
        var m =
            [[cosKut, -sinKut, 0, 0],
            [sinKut, cosKut, 0, 0],
            [0, 0, 1, 0],
            [0, 0, 0, 1]];
        this.mult(m);
    }

    mult(m) {
        var m0 =
            [[0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]];

        for (var i = 0; i < 4; i++) {
            for (var j = 0; j < 4; j++) {
                for (var k = 0; k < 4; k++) {
                    m0[i][j] += m[i][k] * this._matrica[k][j];
                }
            }
        }

        this._matrica = m0;
    }

    rotiraj_oko_osi(x0, y0, z0, u1, u2, u3, kut) {
        var nazivnik = Math.sqrt(Math.pow((u1 - x0), 2) + Math.pow((u2 - y0), 2) + Math.pow((u3 - z0), 2));
        var a = (u1 - x0) / nazivnik;
        var b = (u2 - y0) / nazivnik;
        var c = (u3 - z0) / nazivnik;
        var d = Math.sqrt(Math.pow(b, 2) + Math.pow(c, 2));

        this.pomakni(-x0, -y0, -z0);
        this.rotirajX(Math.asin(b / d));
        this.rotirajY(-Math.asin(a));
        this.rotirajZ(kut);
        this.rotirajY(Math.asin(a));
        this.rotirajX(-Math.asin(b / d));
        this.pomakni(x0, y0, z0);
    }

    kutRadijani(kut) {
        return kut * Math.PI / 180;
    }
}