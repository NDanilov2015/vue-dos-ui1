<template>
	<div id="desktop"></div>
</template>
<script>
export default {
	data: function() { return { } },
}
</script>

<style lang="css">
#desktop {
	height: 90vh;
	background-image: url("data:image/svg+xml;utf8, \
  <svg xmlns='http://www.w3.org/2000/svg' version='1.1' width='10px' height='10px'> \
    <rect x='0' y='0' width='170px' height='50px'\
      style='fill: blue;  fill-opacity: 0.7; '/> \
    <text x='8' y='10' style='fill: red; text-anchor: middle' font-size='16'> \
      ▒</text></svg>");
	  
	-webkit-filter: hue-rotate(var(--deskdeg)) saturate(0.4);
	filter: hue-rotate(var(--deskdeg)) saturate(0.4);
}
</style>