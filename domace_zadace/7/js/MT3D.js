class MT3D {
    _matrica;
    _kamera;

    constructor() {
        this.identitet();
        this.identitetKamera();
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

    identitetKamera() {
        this._kamera =
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


    VP(u, v) {
        let vek = [0, 0, 0];
        vek[0] = u[1] * v[2] - u[2] * v[1];
        vek[1] = u[2] * v[0] - u[0] * v[2];
        vek[2] = u[0] * v[1] - u[1] * v[0];

        return vek;
    }

    mnoziMatrice(m1, m2) {
        let rez =
            [[0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]];

        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                for (let k = 0; k < 4; k++) {
                    rez[i][j] += m1[i][k] * m2[k][j];
                }
            }
        }

        return rez;
    }

    VD(v) {
        return Math.sqrt(Math.pow(v[0], 2) + Math.pow(v[1], 2) + Math.pow(v[2], 2))
    }

    postaviKameru(x0, y0, z0, x1, y1, z1, Vx, Vy, Vz) {
        var V = [Vx, Vy, Vz];
        var N = [x0 - x1, y0 - y1, z0 - z1];
        var Nmag = this.VD(N);
        var n = [N[0] / Nmag, N[1] / Nmag, N[2] / Nmag];
        var U = this.VP(V, n);
        var Umag = this.VD(U);
        var u = [U[0] / Umag, U[1] / Umag, U[2] / Umag];
        var v = this.VP(n, u);

        var u4 = -u[0] * x0 - u[1] * y0 - u[2] * z0;
        var v4 = -v[0] * x0 - v[1] * y0 - v[2] * z0;
        var n4 = -n[0] * x0 - n[1] * y0 - n[2] * z0;

        this._kamera =
            [[u[0], u[1], u[2], u4],
            [v[0], v[1], v[2], v4],
            [n[0], n[1], n[2], n4],
            [0, 0, 0, 1]];
    }
    lista() {
        var izlaznaLista = [];

        for (var i = 0; i < 4; i++) {
            for (var j = 0; j < 4; j++) {
                izlaznaLista.push(this._matrica[j][i]);
            }
        }

        return izlaznaLista;
    }

    projekcija3D(xmin, xmax, ymin, ymax) {
        let tx = (xmin + xmax) / (xmin - xmax);
        let ty = (ymin + ymax) / (ymin - ymax);
        let sx = 2 / (xmax - xmin);
        let sy = 2 / (ymax - ymin);

        var m =
            [[sx, 0, tx, 0],
            [0, sy, ty, 0],
            [0, 0, 1, 0],
            [0, 0, 0, 1]];
        this.mult(m);
    }
}