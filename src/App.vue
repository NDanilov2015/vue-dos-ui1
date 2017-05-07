<template>
  <div id="app">
	<div id="maincontainer">
		<div id="menubar">Factorial - Calculating of factorial function() of numbers.     By: N.A.Danilov, 2017 (С) </div>
		<desktop>
		</desktop>
	</div><!-- end maincontainer -->

<base-window v-if="toggleHelpWindow" id="helpWindow" title="Help" internalheader="Short help for this SPA web-application" :divline="true"
text='Instructions
1) Press Alt + {2}
2) Enter a number and press Enter.
3) Enjoy the result!
4) If necessary, close the window with the Esc key
'
class="textInfo" style="width: 550px;">
</base-window>

<input-window v-if="toggleInputWindow" id="inputwindow" title="Data input" internalheader="Please, input integer number and press Enter:" :divline="false" class="inputtext" style="width: 450px;"></input-window>

<base-window v-if="toggleMSDOSWindow" id="msdos" title="Error" internalheader="" :divline="false" text="Couldn't start MS-DOS Shell of 1996 year version in 2017 year - because of in the same river can not enter twice." class="textDanger" style="width: 450px;"></base-window>

<base-window v-if="toggleOutputWindow" id="outputwindow" title="Calculating results"	v-bind:internalheader="sourceData" :divline="true" v-bind:text="''+calculatedResult" class="textInfo" style="width: 550px;"></base-window>


	<footer>
	<div id="fnkeysblock">
    <template v-if="!this.store.state.isModalOpen">
			<fnkey fnkey="1" title="Help" v-on:fnkeyclick="helpWindow()"></fnkey>
			<fnkey fnkey="2" title="Input num" v-on:fnkeyclick="inputWindow()"></fnkey>
			<fnkey fnkey="3" title="Desk color" v-on:fnkeyclick="rotateDesktopColor()"></fnkey>
			<fnkey fnkey="4" title="Menu color" v-on:fnkeyclick="rotateMenuColor()"></fnkey>
			<fnkey fnkey="5" title="Reset color" v-on:fnkeyclick="resetColors()"></fnkey>
			<fnkey fnkey="6" title="MS-DOS" v-on:fnkeyclick="startMSDOS()"></fnkey>
			<fnkey fnkey="9" title="Setup"></fnkey>
    </template>
    <template v-else>
      <fnkey fnkey="ESC" title="Close window" v-on:fnkeyclick="closeAnyModalWindow()"></fnkey>
			<fnkey v-if="this.store.state.isEnterEnabled" fnkey="Enter" title="Input data!" v-on:fnkeyclick='this.bus.$emit("enterpressed");'></fnkey>
    </template>
	</div>
	</footer>

  </div><!-- end div app -->
</template>

<script>
import Vue from 'Vue';
import Vuex from 'Vuex';

import fnkey from './components/fnkey.vue';
import Desktop from './components/Desktop.vue';
import BaseWindow from './components/BaseWindow.vue';
import InputWindow from './components/InputWindow.vue';

Vue.use(Vuex);

window.store = new Vuex.Store({

	state: {
		isModalOpen: false, //Is any modal window open?
		isEnterEnabled: false, //Is [Enter] key enable for "hot keys" line?
		currentModal: null, //What modal window is open now?
		currentFile: '',
	},

	mutations: {
		modalOpen(state, pointer) { state.isModalOpen = true; state.currentModal = pointer; },
		modalClose(state, pointer) { state.isModalOpen = false; state.currentModal = null; },

		enableEnter(state, pointer) { state.isEnterEnabled = true; state.currentModal = pointer; },
		disableEnter(state, pointer) { state.isEnterEnabled = false; state.currentModal = pointer; },
	}
});

/* Random array of MS-DOS-like colors */
var colors = ["black", "white",
"red", "green", "blue",
"cyan", "magenta", "yellow",
"lightblue", "lightgreen", "lightred",
"brown", "gray", "darkgray", "lightgray",
"darkred", "darkgreen", "darkblue",
"darkcyan", "darkred", "darkmagenta", "darkyellow"];

function getRandomColor() {
	return colors[Math.floor(Math.random()*colors.length)];
}

window.bus = new Vue();

//Где же сам экземпляр Vue?
export default {
  name: 'app',
  components: { fnkey, Desktop, BaseWindow, InputWindow },

  data () {
    return {
		toggleHelpWindow: false,
		toggleInputWindow: false,
		toggleOutputWindow: false,
		toggleMSDOSWindow: false,

		desktopColorDEG: 0,
		menuColorDEG: 0,

		sourceData: 0,
		calculatedResult: 0,
    store,
	}
},

mounted: function () {
    var self = this;

    bus.$on('closemodalwindow', function (msg) {
      self.closeAnyModalWindow(); //without this!
  });

  bus.$on('enterdata', function (data) {
      self.dataInput(data);
    });
},

methods: {
	helpWindow: function(event) { this.toggleHelpWindow = true; store.commit('modalOpen'); }, //Handler of Alt+1 keys click)

	inputWindow: function(event) { this.toggleInputWindow = true; store.commit('modalOpen'); }, //Handler of Alt+2 keys click

	rotateDesktopColor: function(event) {
		this.desktopColorDEG += 20;
		document.documentElement.style.setProperty(`--deskdeg`, this.desktopColorDEG + "deg"); //Change CSS-filter
		},

	rotateMenuColor: function(event) {
		document.documentElement.style.setProperty(`--menubk`, getRandomColor());
		document.documentElement.style.setProperty(`--menufg`, getRandomColor());
		},

	resetColors: function(event) { //Reset colors of Desktop and menubar + hot keys line to source
		document.documentElement.style.setProperty(`--deskdeg`, "0deg");
		document.documentElement.style.setProperty(`--menubk`, "lightgray");
		document.documentElement.style.setProperty(`--menufg`, "black");
	},

	startMSDOS: function(event) { this.toggleMSDOSWindow = true; store.commit('modalOpen');},

	getFactorial: function(n) {
		return n ? n * this.getFactorial(n - 1) : 1;
	},

	dataInput: function(data) {
		this.closeAnyModalWindow();

		this.sourceData = "The factorial of a number " + data + " is..." ; //For "internalheader" prop of input window
		this.calculatedResult = this.getFactorial(data);

		this.toggleOutputWindow = true; store.commit('modalOpen');
	},

	/* This function close any open modal window */
	closeAnyModalWindow: function() {
		store.commit('modalClose');
		store.commit('disableEnter'); //Disable Enter key
		/* Passing to any modal window... */
		this.toggleHelpWindow = false;
		this.toggleInputWindow = false;
		this.toggleOutputWindow = false;
		this.toggleMSDOSWindow = false; //We see reactivity of Vue!
	},
	}
}
</script>

<style>
/* CSS variables - in 2017 year, hurra! */
:root{
	--bkcolor: darkblue;
	--fgcolor: cyan;

	--deskdeg: 0deg;

	--menubk: lightgray;
	--menufg: black;

	--infobk: darkblue;
	--infofg: white;

	--inputbk: darkcyan;
	--inputfg: white;
}

body {
font-size: 1.51vw;
font-family: Menlo, Consolas, monospace;

/*background-color: var(--bkcolor); /* 128 из 255 в RGB! */
color: var(--fgcolor);
}

#app {
	height: 91vh !important;
	min-height: 91vh !important;
}

#main-container {
	height: 85vh !important;
}

#menubar {
	background-color: var(--menubk);
	color: var(--menufg);
	text-align: center;
}

footer {
	background-color: var(--menubk);
	color: var(--menufg);
}

#fnkeysblock {
	margin: 0px auto 0px auto;
}
</style>
