window.onload = WebGLaplikacija;
function WebGLaplikacija() {
  var platno1 = document.getElementById("platno");
  gl = platno1.getContext("webgl2");
  if (!gl) alert("WebGL2 nije dostupan!");

  GPUprogram1 = pripremiGPUprogram(gl, "vertex-shader", "fragment-shader");
  gl.useProgram(GPUprogram1); // možemo imati više GPU programa

  var u_mTrans = gl.getUniformLocation(GPUprogram1, "u_mTrans");
  var u_boja = gl.getUniformLocation(GPUprogram1, "u_boja");

  var mt3d = new MT3D();
  var kut = 0;
  var a = 0.5;
  var vrhovi = [];
  var h = 0.9;
  var fVAO = gl.createVertexArray();
  var mrezaVAO = gl.createVertexArray();
 var podSrafura = [];

  for (var i = -1; i <= 1; i += 0.1) {
    podSrafura.push(i, -0.1, -1);
    podSrafura.push(i, -0.1, 1);
  }

  for (var i = -1; i <= 1; i += 0.1) {
    podSrafura.push(-1, -0.1, i);
    podSrafura.push(1, -0.1, i);
  }
  
  for (let i = 0; i <= 0.8; i += 0.2) {
    if (i == 0.4) {
      for (let j = 0; j <= 0.2; j+=0.2) {
        crtaj(a, i, j);
      }
    }
    else{
      if (i == 0.8) {
        for (let j = 0; j <= 0.4; j+=0.2) {
          crtaj(a, i, j);
        }
      }
      else{
        crtaj(a, i, 0);
      }
    }
  }

  function iscrtajF() {
    gl.clearColor(0.2, 0.2, 0.2, 1);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.viewport(0, 0, platno1.width, platno1.height);
    
    if (kut === 360) {
      if (h >= 2) {
        h = 0.4;
      } else {
        h += 0.1;
      }
    }

    if (kut > 360) {
      kut = 0;
    } else {
      kut += 2;
    }

    mt3d.identitet();
    mt3d.persp(-0.15, 0.15, -0.15, 0.15, 0.15, 5);
    mt3d.postaviKameru(1.5, h, 1.5, 0, 0, 0, 0, 1.5, 0);
    mt3d.rotirajY(kut);

    gl.uniformMatrix4fv(GPUprogram1.u_mTrans, false, mt3d.lista());
    gl.bindVertexArray(fVAO);
    gl.drawArrays(gl.TRIANGLES, 0, vrhovi.length);

    gl.bindVertexArray(mrezaVAO);
    gl.drawArrays(gl.LINES, 0, podSrafura.length);
    requestAnimationFrame(iscrtajF);
  }

  function crtaj(a, pomakY, pomakX) {
    vrhovi.push(
      //prednja strana kocke
      [-a / 5, a / 5 + pomakY, a / 5 + pomakX, 0.98, 0.64, 0.11],
      [-a / 5, -a / 5 + pomakY, a / 5 + pomakX, 0.98, 0.64, 0.11],
      [-a / 5, -a / 5 + pomakY, -a / 5 + pomakX, 0.98, 0.64, 0.11],
      [-a / 5, -a / 5 + pomakY, -a / 5 + pomakX, 0.98, 0.64, 0.11],
      [-a / 5, a / 5 + pomakY, -a / 5 + pomakX, 0.98, 0.64, 0.11],
      [-a / 5, a / 5 + pomakY, a / 5 + pomakX, 0.98, 0.64, 0.11],
      //stražnja strana kocke
      [a / 5, -a / 5 + pomakY, a / 5 + pomakX, 1.0, 0.83, 0.36],
      [a / 5, a / 5 + pomakY, a / 5 + pomakX, 1.0, 0.83, 0.36],
      [a / 5, a / 5 + pomakY, -a / 5 + pomakX, 1.0, 0.83, 0.36],
      [a / 5, a / 5 + pomakY, -a / 5 + pomakX, 1.0, 0.83, 0.36],
      [a / 5, -a / 5 + pomakY, -a / 5 + pomakX, 1.0, 0.83, 0.36],
      [a / 5, -a / 5 + pomakY, a / 5 + pomakX, 1.0, 0.83, 0.36],
      //gornja strana kocke
      [a / 5, a / 5 + pomakY, a / 5 + pomakX, 0.33, 0.49, 0.47],
      [-a / 5, a / 5 + pomakY, a / 5 + pomakX, 0.33, 0.49, 0.47],
      [-a / 5, a / 5 + pomakY, -a / 5 + pomakX, 0.33, 0.49, 0.47],
      [-a / 5, a / 5 + pomakY, -a / 5 + pomakX, 0.33, 0.49, 0.47],
      [a / 5, a / 5 + pomakY, -a / 5 + pomakX, 0.33, 0.49, 0.47],
      [a / 5, a / 5 + pomakY, a / 5 + pomakX, 0.33, 0.49, 0.47],
      //donja strana kocke
      [-a / 5, -a / 5 + pomakY, a / 5 + pomakX, 0.95, 0.36, 0.3],
      [a / 5, -a / 5 + pomakY, a / 5 + pomakX, 0.95, 0.36, 0.3],
      [a / 5, -a / 5 + pomakY, -a / 5 + pomakX, 0.95, 0.36, 0.3],
      [a / 5, -a / 5 + pomakY, -a / 5 + pomakX, 0.95, 0.36, 0.3],
      [-a / 5, -a / 5 + pomakY, -a / 5 + pomakX, 0.95, 0.36, 0.3],
      [-a / 5, -a / 5 + pomakY, a / 5 + pomakX, 0.95, 0.36, 0.3],
      //lijeva strana kocke
      [a / 5, -a / 5 + pomakY, -a / 5 + pomakX, 0.8, 0.13, 0.17],
      [a / 5, a / 5 + pomakY, -a / 5 + pomakX, 0.8, 0.13, 0.17],
      [-a / 5, a / 5 + pomakY, -a / 5 + pomakX, 0.8, 0.13, 0.17],
      [-a / 5, a / 5 + pomakY, -a / 5 + pomakX, 0.8, 0.13, 0.17],
      [-a / 5, -a / 5 + pomakY, -a / 5 + pomakX, 0.8, 0.13, 0.17],
      [a / 5, -a / 5 + pomakY, -a / 5 + pomakX, 0.8, 0.13, 0.17],
      //desna strana kocke
      [a / 5, -a / 5 + pomakY, a / 5 + pomakX, 0.48, 0.65, 0.57],
      [-a / 5, -a / 5 + pomakY, a / 5 + pomakX, 0.48, 0.65, 0.57],
      [-a / 5, a / 5 + pomakY, a / 5 + pomakX, 0.48, 0.65, 0.57],
      [-a / 5, a / 5 + pomakY, a / 5 + pomakX, 0.48, 0.65, 0.57],
      [a / 5, a / 5 + pomakY, a / 5 + pomakX, 0.48, 0.65, 0.57],
      [a / 5, -a / 5 + pomakY, a / 5 + pomakX, 0.48, 0.65, 0.57]
    );
  }

  function napuniSpremnike() {
    GPUprogram1.a_vrhXYZ = gl.getAttribLocation(GPUprogram1, "a_vrhXYZ");
    GPUprogram1.u_mTrans = gl.getUniformLocation(GPUprogram1, "u_mTrans");
    GPUprogram1.a_boja = gl.getAttribLocation(GPUprogram1, "a_boja");
    var spremnikVrhova = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, spremnikVrhova);

    // povezivanje s atribut varijablama u programu za sjenčanje
    GPUprogram1.a_vrhXYZ = gl.getAttribLocation(GPUprogram1, "a_vrhXYZ");
    GPUprogram1.a_boja = gl.getAttribLocation(GPUprogram1, "a_boja");
    GPUprogram1.u_mTrans = gl.getUniformLocation(GPUprogram1, "u_mTrans");

    gl.bindVertexArray(fVAO);
    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.enableVertexAttribArray(GPUprogram1.a_vrhXYZ);
    gl.enableVertexAttribArray(GPUprogram1.a_boja);
    gl.vertexAttribPointer(GPUprogram1.a_vrhXYZ, 3, gl.FLOAT, false, 24, 0);
    gl.vertexAttribPointer(GPUprogram1.a_boja, 3, gl.FLOAT, false, 24, 12);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vrhovi.flat()), gl.STATIC_DRAW);

    gl.bindVertexArray(mrezaVAO);
    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.enableVertexAttribArray(GPUprogram1.a_vrhXYZ);
    gl.vertexAttribPointer(GPUprogram1.a_vrhXYZ, 3, gl.FLOAT, false, 12, 0);
    // punjenje spremnika - podaci koji se šalju na GPU
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(podSrafura.flat()), gl.STATIC_DRAW);
    gl.vertexAttrib3f(GPUprogram1.a_boja, 0.5, 0.5, 1);

    gl.enable(gl.DEPTH_TEST);
  } // napuniSpremnike

  napuniSpremnike();
  iscrtajF();
  
} // WebGLaplikacija
