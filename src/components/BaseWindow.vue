<template>
	<div style="padding: 25px;">
		<div style="border: double 5px; padding: 25px;">
			<div class="bwtitle">{{ title }}</div>
			<span style="color:cyan;">{{ internalheader }}</span> <br/>
			<div style="color:magenta; display:inline;">{{ getDivider() }}</div> <br/>
			{{ text }}
		</div>
	</div>
</template>

<script>

export default {
props: {
 	'title' : { type: String, default: 'Window title' },
	'divline' : { type: Boolean, default: true },
	'internalheader' : { type : String, default: 'Internal header' },
	'text' : { type : String, default : 'Text in the window. This is text content' },
	'bkcolor' : { type: String, default : 'blue' },
	'forecolor' : { type: String, default : 'white' },
},

created: function() { window.addEventListener('keydown', this.keyHandler); },

beforeDestroy: function() { window.removeEventListener('keydown', this.keyHandler); },

methods: {
		keyHandler: function(e) {
			//Self-closing property by ESC key))) Now, very crooked of course...
			if (e.keyCode == 27) {
				bus.$emit('closemodalwindow');
			}
				//vm1.closeAnyModalWindow();
			//TODO: link to any owner object, like it was in "Turbo Vision" OOP Environment 20 years ago
		},
		getDivider: function() {
			var sym = "─", divider="";
			var inthead = this.internalheader;

			if (!this.divline || this.divline == false) { return null; }

			if (!inthead) { return ""; } //Test on initializing of this object - not null on the second pass.. but why?
			for (var i=0; i <= inthead.length; i++) {	divider += sym; }

			return divider;
		}
	}//end methods
} //end export section
</script>

<style lang="css">
.textInfo {
	color: var(--infofg);
	background-color: var(--infobk);
	white-space: pre-wrap;
}

#helpWindow, #msdos, #inputwindow, #outputwindow {
	position: absolute;
	top: 24.4vh;
	left: 19.5vw;
}

.bwtitle {
	position: absolute;
	top: 15px;
	left: 200px;
	z-index: 0;
	padding: 0 10px 0 10px;
}

.textInfo .bwtitle {
	background-color: darkblue;
	color: white;
}

.textDanger {
	color: white;
	background-color: darkred;
}

.textDanger .bwtitle {
	background-color: darkred;
}

</style>
