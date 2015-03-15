  var renderer  = new THREE.WebGLRenderer();
  renderer.setSize( window.innerWidth, window.innerHeight );
  document.body.appendChild( renderer.domElement );
  var onRenderFcts= [];
  var scene = new THREE.Scene();
  var camera  = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.01, 1000);
  camera.position.z = 150;

  /////////////////////////////////////////////////
  //    add an object and make it move          //
  ////////////////////////////////////////////////
  var geometry  = new THREE.SphereGeometry( 0.5,128,128 )
  var material  = new THREE.MeshNormalMaterial()

  for(var i=0;i<100;i++){
    var mesh = new THREE.Mesh( geometry, material );
    mesh.position.x = Math.random() * 100 - 50;
    mesh.position.y = Math.random() * 100 - 50;
    mesh.position.z = Math.random() * 100 - 50;
      scene.add(mesh)
      console.log(mesh);
  }
      // var geometry  = new THREE.SphereGeometry( 0.5,128,128 )
      // var material  = new THREE.MeshNormalMaterial()
      // var mesh  = new THREE.Mesh( geometry, material )
      // scene.add(mesh);

  /////////////////////////////////////
  //    Camera Controls             //
  /////////////////////////////////////
  var mouse = {x : 0, y : 0}
  document.addEventListener('mousemove', function(event){
    mouse.x = (event.clientX / window.innerWidth ) - 0.5
    mouse.y = (event.clientY / window.innerHeight) - 0.5
  }, false)
  onRenderFcts.push(function(delta, now){
    camera.position.x += (mouse.x*5 - camera.position.x) * (delta*3)
    camera.position.y += (mouse.y*5 - camera.position.y) * (delta*3)
    camera.lookAt( scene.position )
  })
  ///////////////////////////////////
  //    render the scene            //
  ///////////////////////////////////
  onRenderFcts.push(function(){
    renderer.render( scene, camera );
  })

  /////////////////////////////////
  //    loop runner             //
  ////////////////////////////////
  var lastTimeMsec= null
  requestAnimationFrame(function animate(nowMsec){
    // keep looping
    requestAnimationFrame( animate );
    // measure time
    lastTimeMsec  = lastTimeMsec || nowMsec-1000/60
    var deltaMsec = Math.min(200, nowMsec - lastTimeMsec)
    lastTimeMsec  = nowMsec
    // call each update function
    onRenderFcts.forEach(function(onRenderFct){
      onRenderFct(deltaMsec/1000, nowMsec/1000)
    })
  })