<template>
	<div class="fnkey" :style="activeBK" v-on:click="clickEvent">
		{{ getALTHint + fnkey }}&nbsp;
		<div :style="activeBK" class="fnkb-title">{{ title }}</div>
	</div>
</template>

<script>
export default {
props: {
  'fnkey': { type: String, default: 'ALT+' },
	'title' : { type: String, default: 'Hot key' },
  },

created: function() { window.addEventListener('keyup', this.fnkeyup); },

beforeDestroy: function() { window.removeEventListener('keyup', this.fnkeyup); },

data: function() { return { activeBK: "", } },

computed: {
		getFNkey: function() { return +this.fnkey; //"+" is conversion "String" to "Number"
		},
		keyTable: function() { return [48,49,50,51,52,53,54,55,56,57]; }, //Alt-codes for {0}- {9} keys
		getALTHint: function() {
			var hint = "ALT+";
			if (this.fnkey == "ESC") { hint=""; }
			if (this.fnkey == "Enter") { hint=""; }
			return hint;
		}
	},

	methods: {
		fnkeyup: function(e) {
			if ((e.keyCode == this.keyTable[this.getFNkey]) && e.altKey) {
				e.stopImmediatePropagation();
				this.clickEvent();
			}

			if ((this.fnkey == "Enter") && (e.keyCode == 13)) {
				e.stopImmediatePropagation();
				this.clickEvent();
			}
		}, //end fnkeyup()

		clickEvent: function() {
			var self = this; //Save link to "this" object, as inside setTimeout() "this" not be right object!

			setTimeout(function(){
				self.activeBK = "background-color: green;"; // Coloring in dark-green the background of element
			}, 200); //...for 200 ms
			setTimeout(function(){
                self.activeBK = ""; // Return the background of the element to source color
				self.$emit('fnkeyclick'); //Fire the event

				}, 500);
		}
	}//end methods
}

</script>
<style lang="css">
.fnkey {
	display: inline-block;
	background-color: var(--menubk);
	color: darkred;
	margin-right: 10px;
}

.fnkb-title {
	background-color: var(--menubk);
	color: var(--menufg);
	/*
	min-width: 5.6vw; /* 72px; */
	/*max-width: 6.7vw;  /* 86px; */

	display: inline-block;
	float: right;

	white-space: pre;
}
</style>
