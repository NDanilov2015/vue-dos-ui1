<template>
	<div style="padding: 25px;">
    <div style="border: double 5px; padding: 25px;">
      <div class="bwtitle">{{ title }}</div>
      <span style="color: yellow;">{{ internalheader }}</span> <br/>
      <div style="color:magenta; display:inline;">{{ getDivider() }}</div> <br/>
      <input v-model="num" type="text" style="background-color: darkblue; color:yellow; font-weight: bold;" v-focus>
      </input>
    </div>
  </div>
</template>

<script>

export default {
props: {
 	'title' : { type: String, default: 'Window title' },
	'divline' : { type: Boolean, default: true },
	'internalheader' : { type : String, default: 'Internal header' },
	'bkcolor' : { type: String, default : 'blue' },
	'forecolor' : { type: String, default : 'white' },
},

data () {
  return { num: '', }
},

created: function() {
  window.addEventListener('keydown', this.keyHandler);
  store.commit('enableEnter');
  var self = this;

  bus.$on('enterpressed', function (msg) {
    bus.$emit('enterdata', self.num); //without this!
  });
},

beforeDestroy: function() { window.removeEventListener('keydown', this.keyHandler); },

methods: {
    mounted: function() {

    },
		keyHandler: function(e) {
			//Self-closing property))) Now, very crooked of course...

        if (e.keyCode == 27) { bus.$emit('closemodalwindow'); }
			  if (e.keyCode == 13) { bus.$emit('enterdata', this.num); }
			//TODO: link to any owner object, like it was in "Turbo Vision" OOP Environment 20 years ago
		},
		getDivider: function() {
			var sym = "─", divider="";
			var inthead = this.internalheader;

			if (!this.divline || this.divline == false) { return null; }

			if (!inthead) { return ""; } //Test on initializing of this object - not null on the second pass.. but why?
			for (var i=0; i <= inthead.length; i++) {	divider += sym; }
      //TODO not must much than width of window

			return divider;
		}
	}//end methods
} //end export section
</script>

<style lang="css">
/* bw = base-window */

.inputtext .bwtitle {
background-color: var(--inputbk);
color: var(--inputfg);
}

.inputtext {
	color: var(--inputfg);
	background-color: var(--inputbk);
}

.inputtext .bwtitle {
	background-color: var(--inputbk);
	color: var(--inputfg);
}

#inputwindow {
position: absolute;
top: 24.4vh;
left: 19.5vw;
}
</style>
