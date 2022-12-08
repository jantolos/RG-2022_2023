window.onload = WebGLaplikacija;
function WebGLaplikacija() {
  var platno1 = document.getElementById("platno");
  gl = platno1.getContext("webgl2");
  if (!gl) alert("WebGL2 nije dostupan!");

  GPUprogram1 = pripremiGPUprogram(gl, "vertex-shader", "fragment-shader");
  gl.useProgram(GPUprogram1); // možemo imati više GPU programa

  var u_mTrans = gl.getUniformLocation(GPUprogram1, "u_mTrans");

  var mt3d = new MT3D();
  var kut = 30;

  /*Color paleta je preuzeta s stranice: https://www.pinterest.com/pin/510103095296824881/visual-search/?imageSignature=2e10db5346612eb4fcf25f190f685325 */
  function iscrtaj() {
    gl.enable(gl.CULL_FACE);
    gl.clearColor(0, 0.26, 0.26, 1);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.viewport(0, 0, platno1.width, platno1.height);

    // gore
    mt3d.identitet();
    mt3d.rotirajX(mt3d.kutRadijani(-180));
    mt3d.pomakni(0, 0, 0.68);
    mt3d.rotirajY(mt3d.kutRadijani(kut));
    mt3d.rotirajX(mt3d.kutRadijani(kut) * 4);
    mt3d.rotirajZ(mt3d.kutRadijani(kut) * 5);
    gl.uniformMatrix4fv(u_mTrans, false, mt3d.lista());
    vrhoviK = [
      [-0.68, 0.68, 0.33, 0.49, 0.47],
      [-0.68, -0.68, 0.33, 0.49, 0.47],
      [0.68, -0.68, 0.33, 0.49, 0.47],
      [0.68, 0.68, 0.33, 0.49, 0.47],
      [-0.68, 0.68, 0.33, 0.49, 0.47],
      [0.68, -0.68, 0.33, 0.49, 0.47],
    ];
    napuniSpremnike(vrhoviK);
    gl.drawArrays(gl.TRIANGLES, 0, vrhoviK.length);

    // dole
    mt3d.identitet();
    mt3d.pomakni(0, 0, -0.68);
    mt3d.rotirajY(mt3d.kutRadijani(kut));
    mt3d.rotirajX(mt3d.kutRadijani(kut) * 4);
    mt3d.rotirajZ(mt3d.kutRadijani(kut) * 5);
    gl.uniformMatrix4fv(u_mTrans, false, mt3d.lista());
    vrhoviK = [
      [-0.68, 0.68, 0.95, 0.36, 0.30],
      [-0.68, -0.68, 0.95, 0.36, 0.30],
      [0.68, -0.68, 0.95, 0.36, 0.30],
      [0.68, 0.68, 0.95, 0.36, 0.30],
      [-0.68, 0.68, 0.95, 0.36, 0.30],
      [0.68, -0.68, 0.95, 0.36, 0.30],
    ];
    napuniSpremnike(vrhoviK);
    gl.drawArrays(gl.TRIANGLES, 0, vrhoviK.length);

    // lijevo
    mt3d.identitet();
    mt3d.rotirajY(mt3d.kutRadijani(-90));
    mt3d.pomakni(0.68, 0, 0);
    mt3d.rotirajY(mt3d.kutRadijani(kut));
    mt3d.rotirajX(mt3d.kutRadijani(kut) * 4);
    mt3d.rotirajZ(mt3d.kutRadijani(kut) * 5);
    gl.uniformMatrix4fv(u_mTrans, false, mt3d.lista());
    vrhoviK = [
      [-0.68, 0.68, 0.48, 0.65, 0.57],
      [-0.68, -0.68, 0.48, 0.65, 0.57],
      [0.68, -0.68, 0.48, 0.65, 0.57],
      [0.68, 0.68, 0.48, 0.65, 0.57],
      [-0.68, 0.68, 0.48, 0.65, 0.57],
      [0.68, -0.68, 0.48, 0.65, 0.57],
    ];
    napuniSpremnike(vrhoviK);
    gl.drawArrays(gl.TRIANGLES, 0, vrhoviK.length);

    // desno
    mt3d.identitet();
    mt3d.rotirajY(mt3d.kutRadijani(90));
    mt3d.pomakni(-0.68, 0, 0);
    mt3d.rotirajY(mt3d.kutRadijani(kut));
    mt3d.rotirajX(mt3d.kutRadijani(kut) * 4);
    mt3d.rotirajZ(mt3d.kutRadijani(kut) * 5);
    gl.uniformMatrix4fv(u_mTrans, false, mt3d.lista());
    vrhoviK = [
      [-0.68, 0.68, 0.80, 0.13, 0.17],
      [-0.68, -0.68, 0.80, 0.13, 0.17],
      [0.68, -0.68, 0.80, 0.13, 0.17],
      [0.68, 0.68, 0.80, 0.13, 0.17],
      [-0.68, 0.68, 0.80, 0.13, 0.17],
      [0.68, -0.68, 0.80, 0.13, 0.17],
    ];
    napuniSpremnike(vrhoviK);
    gl.drawArrays(gl.TRIANGLES, 0, vrhoviK.length);

    // naprid
    mt3d.identitet();
    mt3d.rotirajX(mt3d.kutRadijani(-90));
    mt3d.pomakni(0, -0.68, 0);
    mt3d.rotirajY(mt3d.kutRadijani(kut));
    mt3d.rotirajX(mt3d.kutRadijani(kut) * 4);
    mt3d.rotirajZ(mt3d.kutRadijani(kut) * 5);
    gl.uniformMatrix4fv(u_mTrans, false, mt3d.lista());
    vrhoviK = [
      [-0.68, 0.68, 0.98, 0.64, 0.11],
      [-0.68, -0.68, 0.98, 0.64, 0.11],
      [0.68, -0.68, 0.98, 0.64, 0.11],
      [0.68, 0.68, 0.98, 0.64, 0.11],
      [-0.68, 0.68, 0.98, 0.64, 0.11],
      [0.68, -0.68, 0.98, 0.64, 0.11],
    ];
    napuniSpremnike(vrhoviK);
    gl.drawArrays(gl.TRIANGLES, 0, vrhoviK.length);

    //nazad
    mt3d.identitet();
    mt3d.rotirajX(mt3d.kutRadijani(90));
    mt3d.pomakni(0, 0.68, 0);
    mt3d.rotirajY(mt3d.kutRadijani(kut));
    mt3d.rotirajX(mt3d.kutRadijani(kut) * 4);
    mt3d.rotirajZ(mt3d.kutRadijani(kut) * 5);
    gl.uniformMatrix4fv(u_mTrans, false, mt3d.lista());
    vrhoviK = [
      [-0.68, 0.68, 1.00, 0.83, 0.36],
      [-0.68, -0.68, 1.00, 0.83, 0.36],
      [0.68, -0.68, 1.00, 0.83, 0.36],
      [0.68, 0.68, 1.00, 0.83, 0.36],
      [-0.68, 0.68, 1.00, 0.83, 0.36],
      [0.68, -0.68, 1.00, 0.83, 0.36],
    ];
    napuniSpremnike(vrhoviK);
    gl.drawArrays(gl.TRIANGLES, 0, vrhoviK.length);

    if(kut < 360){
      kut += 0.1;
    }else{
      kut = 0;
    }
    requestAnimationFrame(iscrtaj);
  }

  function napuniSpremnike() {
    GPUprogram1.a_vrhXY = gl.getAttribLocation(GPUprogram1, "a_vrhXY");
    GPUprogram1.a_boja = gl.getAttribLocation(GPUprogram1, "a_boja");

    var spremnikVrhova = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, spremnikVrhova);
    gl.enableVertexAttribArray(GPUprogram1.a_vrhXY);
    gl.enableVertexAttribArray(GPUprogram1.a_boja);
    gl.vertexAttribPointer(GPUprogram1.a_vrhXY, 2, gl.FLOAT, false, 20, 0);
    gl.vertexAttribPointer(GPUprogram1.a_boja, 3, gl.FLOAT, false, 20, 8);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vrhoviK.flat()), gl.STATIC_DRAW);
  }
  iscrtaj();
}
