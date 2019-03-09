(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (factory());
}(this, (function () { 'use strict';

window.jraDebug = false;
window.toggleDebug = function () {
    window.jraDebug = !window.jraDebug;
};

/**
 * Logs an error message, only when window.jraDebug is set to true;
 * @param message
 */
function logError(message, renderImmediate) {
    var css = "background:red;color:white; padding-left:2px; padding-right:2px;";
    if (window.jraDebug || renderImmediate) {
        console.log("%c " + message, css);
    }
}

/**
 * Checks the context to ensure it has the desired extension enabled
 * @param ctx {WebGLRenderingContext} the webgl context to check
 * @param extension {String} the name of the extension to look for
 */


/**
 * Logs a warning message, only when window.jraDebug is set to true
 * @param message
 */
function logWarn(message, renderImmediate) {
    var css = "background:yellow;color:red; padding-left:2px; padding-right:2px;";
    if (window.jraDebug || renderImmediate) {
        console.log("%c " + message, css);
    }
}

/**
 * Logs a regular console.log call, only when window.jraDebug is set to true
 * @param message
 */

/**
 * Flattens an nested array that is assumed to be nested with child arrays used in place of
 * an actual vector object. Note, this does not check for completeness and will automatically
 * only take the first 3 values of the child arrays
 * @param array the parent array
 * @returns {Array}
 */
function flattenArray(array) {
    var reSize = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 3;


    var fin = [];
    var len = array.length;
    for (var i = 0; i < len; ++i) {
        var arr = array[i];
        fin.push(arr[0], arr[1], arr[2]);
    }

    // map through to ensure we don't have any unknown / undefined values.
    // if so, set to 0
    fin = fin.map(function (itm) {
        if (itm === undefined || itm === null) {
            return 0.0;
        } else {
            return itm;
        }
    });

    return fin;
}

/**
 * Does subtraction between two arrays. Assumes both arrays have 3 values each inside
 * @param array1 {Array} the array to subtract from
 * @param array2 {Array} the array to subtract
 * @returns {*[]}
 */








/**
 * Converts value to radians
 * @param deg a value in degrees
 */
function toRadians(deg) {
    return deg * Math.PI / 180;
}

/**
 * Normalizes array values
 * @param vec an array of 3 components.
 * @returns {*}
 */


/**
 * Cross function.
 * @param a first "vector" / array
 * @param b second "vector" / array
 * @returns {[*,*,*]}
 */


/**
 * Creates an array with a range of values
 * @param from {Number} the value to start from
 * @param to {Number} the value end at.
 * @returns {Array}
 */
function range(from, to) {
    var result = [];
    var n = from;
    while (n < to) {
        result.push(n);
        n += 1;
    }
    return result;
}

/**
 * Returns a random vec3(in the form of an array)
 * @returns {*[]}
 */


/**
 * Performs linear interpolation of a value
 * @param value the value to interpolate
 * @param min the minimum value
 * @param max the maximum value
 * @returns {number}
 */


/**
 * Returns a random float value between two numbers
 * @param min the minimum value
 * @param max the maximum value
 * @returns {number}
 */
function randFloat() {
    var min = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    var max = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

    return min + Math.random() * (max - min + 1);
}

/**
 * Returns a random integer value between two numbers
 * @param min the minimum value
 * @param max the maximum value
 * @returns {number}
 */
function randInt() {
    var min = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    var max = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

    return Math.floor(min + Math.random() * (max - min + 1));
}

/**
 * Very simple array cloning util.
 * Note - only works with arrays who have 3 elements
 * @param arrayToClone the array to clone
 * @returns {*[]} the new array
 */


/**
 * Ensures a value lies in between a min and a max
 * @param value
 * @param min
 * @param max
 * @returns {*}
 */
function clamp(value, min, max) {
    return min < max ? value < min ? min : value > max ? max : value : value < max ? max : value > min ? min : value;
}

/**
 * ensures that when using an array as a 3d vector, that it actually
 * contains at max 3 components.
 * @param array the array to verify
 * @returns {*}
 */

/**
 * This is meant to provide some convinience functions on top of a
 * WebGLContext object
 * @param width width for the canvas
 * @param height height for the canvas.
 * @constructor
 */
var RendererFormat = function RendererFormat(width, height) {
    this.viewportX = 0;
    this.viewportY = 0;
    this.clear_color = [0, 0, 0, 1];
    this.width = width;
    this.height = height;
};

RendererFormat.prototype = {
    /**
     * Appends the canvas to the DOM.
     * @param {node} el the element you want to append to. By default will append to body
     */
    attachToScreen: function attachToScreen() {
        var el = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document.body;

        el.appendChild(this.canvas);
        return this;
    },


    // alias for the above function
    anchorToScreen: function anchorToScreen() {
        var el = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document.body;

        this.attachToScreen(el);
    },


    /**
     * Shorthand for enabling blending.
     */
    enableBlending: function enableBlending() {
        this.enable(this.BLEND);
    },


    /**
     * Shorthand for setting the current blend function.
     * @param funcName1 {String} the mode for the src pixel
     * @param funcName2 {String} mode for the destination pixel
     */
    setBlendFunction: function setBlendFunction(funcName1, funcName2) {
        this.blendFunc(this[funcName1], this[funcName2]);
    },


    /**
     * Enables alpha blending
     */
    enableAlphaBlending: function enableAlphaBlending() {
        this.setBlendFunction("SRC_ALPHA", "ONE");
    },


    /**
     * Enables additive blending.
     * Note - that it assumes depth testing is already turned off.
     */
    enableAdditiveBlending: function enableAdditiveBlending() {
        this.enable(this.BLEND);
        this.blendEquationSeparate(this.FUNC_ADD, this.FUNC_ADD);
        this.blendFuncSeparate(this.ONE, this.ONE, this.ONE, this.ONE);
    },


    /**
     * Sets the size of the gl canvas
     * @param width {Number} Width that the canvas should be. Defaults to entire window
     * @param height { Number} Height that the canvas should be. Defaults to window.innerHeight
     * @returns {RendererFormat}
     */
    setSize: function setSize() {
        var width = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : window.innerWidth;
        var height = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : window.innerHeight;

        this.canvas.width = width;
        this.canvas.height = height;
        return this;
    },


    /**
     * Sets the blend function so that multiple textures can get overlaid
     * on top of each other.
     */
    blendLayers: function blendLayers() {
        this.setBlendFunction("ONE", "ONE_MINUS_SRC_ALPHA");
    },


    /**
     * Shorthand for disabling blending.
     */
    disableBlending: function disableBlending() {
        this.disable(this.BLEND);
    },


    /**
     * Enables an attribute to become instanced.
     * @param attributeLoc the attribute location of the attribute you want to be instanced.
     * @param divisor The divisor setting for that attribute. It is 1 by default which should fit most
     * use cases.
     */
    enableInstancedAttribute: function enableInstancedAttribute(attributeLoc) {
        var divisor = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;


        if (!this.isWebGL2) {
            if (this.hasOwnProperty("ANGLE_instanced_arrays")) {
                var ext = this.ANGLE_instanced_arrays;
                ext.vertexAttribDivisorANGLE(attributeLoc, divisor);
            } else {
                console.warn("Current GPU does not support the ANGLE_instance_arrays extension");
            }
        } else {
            this.vertexAttribDivisor(attributeLoc, divisor);
        }

        return this;
    },


    /**
     * Disables an attribute to become instanced.
     * @param attributeLoc the attribute location of the attribute you want to be instanced.
     */
    disableInstancedAttribute: function disableInstancedAttribute(attributeLoc) {

        if (!this.isWebGL2) {
            if (this.hasOwnProperty("ANGLE_instance_arrays")) {
                var ext = this.ANGLE_instanced_arrays;
                ext.vertexAttribDivisorANGLE(attributeLoc, 0);
            } else {
                console.warn("Current GPU does not support the ANGLE_instance_arrays extension");
            }
        } else {
            this.vertexAttribDivisor(attributeLoc, 0);
        }
    },

    /**
     * Runs the drawArraysInstanced command of the context. If the context is
     * webgl 1, it attempts to try and use the extension, if webgl 2, it runs the
     * regular command.
     * @param mode A GLenum specifying the type primitive to render, ie GL_TRIANGLE, etc..:
     * @param first {Number} a number specifying the starting index in the array of vector points.
     * @param count {Number} a number specifying the number of vertices
     * @param primcount {Number} a number specifying the number of instances to draw
     */
    drawInstancedArrays: function drawInstancedArrays(mode, first, count, primcount) {
        if (!this.isWebGL2) {
            if (this.hasOwnProperty("ANGLE_instanced_arrays")) {
                this.ANGLE_instanced_arrays.drawArraysInstancedANGLE(mode, first, count, primcount);
            } else {
                console.error("Unable to draw instanced geometry - extension is not available");
            }
        } else {
            this.drawArraysInstanced(mode, first, count, primcount);
        }
    },


    /**
     * Drawing function to use for instanced items that have indices
     * @param mode {Number} the drawing mode, gl.TRIANGLES, etc..
     * @param numElements {Number} the number of element to draw(aka the number of indices)
     * @param numInstances {Number} the number of instances of the object to draw
     * @param type {Number} the data type of the index data, defaults to gl.UNSIGNED_SHORT
     * @param offset {Number} A GLintptr specifying an offset in the element array buffer. Must be a valid multiple of the size of the given type.
     */
    drawInstancedElements: function drawInstancedElements(mode, numElements, numInstances) {
        var _ref = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {},
            _ref$type = _ref.type,
            type = _ref$type === undefined ? UNSIGNED_SHORT : _ref$type,
            _ref$offset = _ref.offset,
            offset = _ref$offset === undefined ? 0 : _ref$offset;

        if (!this.isWebGL2) {
            if (this.hasOwnProperty("ANGLE_instanced_arrays")) {
                this.ANGLE_instanced_arrays.drawElementsInstancedANGLE(mode, numElements, type, offset, numInstances);
            } else {
                console.error("Unable to draw instanced geometry - extension is not available");
            }
        } else {
            this.drawElementsInstanced(mode, numElements, type, offset, numInstances);
        }
    },


    /**
     * Sets the context to be full screen.
     * @param {function} customResizeCallback specify an optional callback to deal with what happens
     * when the screen resizes.
     * @returns {RendererFormat}
     */
    setFullscreen: function setFullscreen() {
        var _this = this;

        var customResizeCallback = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;

        //set the viewport size
        this.setViewport();

        if (customResizeCallback) {
            window.addEventListener("resize", customResizeCallback);
        } else {
            window.addEventListener("resize", function () {
                _this.canvas.width = window.innerWidth;
                _this.canvas.height = window.innerHeight;
                _this.setViewport();
            });
        }
        return this;
    },


    /**
     * Helper function for clearing the screen, clear with a clear color,
     * set the viewport and clear the depth and color buffer bits
     * @param {number} r the value for the red channel of the clear color.
     * @param {number} g the value for the green channel of the clear color.
     * @param {number} b the value for the blue channel of the clear color.
     * @param {number} a the value for the alpha channel
     */
    clearScreen: function clearScreen() {
        var r = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
        var g = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
        var b = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
        var a = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1;

        this.clearColor(r, g, b, a);
        this.viewport(this.viewportX, this.viewportY, this.canvas.width, this.canvas.height);
        this.clear(this.COLOR_BUFFER_BIT | this.DEPTH_BUFFER_BIT);
        return this;
    },


    /**
     * This clears all currently bound textures
     */
    clearTextures: function clearTextures() {
        this.bindTexture(this.TEXTURE_2D, null);
    },


    /**
     * Useful when overlaying FBOs,
     * clears the buffer with a transparent overlay
     */
    clearTransparent: function clearTransparent() {
        this.clearScreen(0, 0, 0, 0);
    },

    /**
     * Resets the current clear color.
     * @param {number} r the value for the red channel of the clear color.
     * @param {number} g the value for the green channel of the clear color.
     * @param {number} b the value for the blue channel of the clear color.
     * @param {number} a the value for the alpha channel
     */
    setClearColor: function setClearColor() {
        var r = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
        var g = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
        var b = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
        var a = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1;

        this.clearColor(r, g, b, a);
    },


    /**
     * Enable depth testing
     */
    enableDepth: function enableDepth() {
        this.enable(this.gl.DEPTH_TEST);
        return this;
    },


    /**
     * Disables Depth testing
     */
    disableDepth: function disableDepth() {
        this.disable(this.gl.DEPTH_TEST);
    },


    /**
     * Returns the maximum texture size that the current card
     * supports.
     */
    getMaxTextureSize: function getMaxTextureSize() {
        return this.getParameter(this.gl.MAX_TEXTURE_SIZE);
    },


    /**
     * Sets the viewport for the context
     * @param {number} x the x coordinate for the viewport
     * @param {number} y the y coordinate for the viewport
     * @param {number} width the width for the viewport
     * @param {number} height the height for the viewport
     */
    setViewport: function setViewport() {
        var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
        var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
        var width = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : window.innerWidth;
        var height = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : window.innerHeight;

        this.viewport(x, y, width, height);
    },


    /**
     * Saves some typing when applying general camera uniforms.
     * @param shader {Object} shader object to use that was created with src/core/shader.js
     * @param camera {Object} camera object to use that was created with src/framework/Camera or any other kind of object
     * that consists of projection and view keys.
     * @param projection {String} name of the projection matrix uniform
     * @param view {String} name of the view matrix uniform
     */
    applyCameraUniforms: function applyCameraUniforms(shader, camera) {
        var _ref2 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
            _ref2$projection = _ref2.projection,
            projection = _ref2$projection === undefined ? "projection" : _ref2$projection,
            _ref2$view = _ref2.view,
            view = _ref2$view === undefined ? "view" : _ref2$view;

        shader.set4x4Uniform(projection, camera.projection);
        shader.set4x4Uniform(view, camera.view);
    }
};

/**
 * Enables some extensions that are commonly used in WebGL 1.
 * @param gl {WebGLRenderingContext} a WebGL 1 context
 * @returns {{}}
 */
function getExtensions(gl) {
    var exts = {};

    // common extensions we might want
    var extensions = ["OES_texture_float", "OES_vertex_array_object", "ANGLE_instanced_arrays", "OES_texture_half_float", "OES_texture_float_linear", "OES_texture_half_float_linear", "WEBGL_color_buffer_float", "EXT_color_buffer_half_float", "OES_standard_derivatives", "WEBGL_draw_buffers", "WEBGL_depth_texture"];

    extensions.forEach(function (name) {
        // try getting the extension
        var ext = gl.getExtension(name);

        // if debugging is active, show warning message for any missing extensions
        if (ext === null) {
            logWarn('Unable to get extension ' + name + ', things might look weird or just plain fail');
        }
        exts[name] = ext;
    });

    return exts;
}

/**
 * Creates a WebGLRendering context
 * @param node an optional node to build the context from. If nothing is provided, we generate a canvas
 * @param options any options for the context
 * @returns {*} the resulting WebGLRenderingContext
 */
function createContext() {
    var node = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    var el = node !== null ? node : document.createElement("canvas");
    var isWebGL2 = false;
    var defaults = {
        alpha: true,
        antialias: true,
        depth: true
    };

    // override any defaults if set
    Object.assign(options, defaults);

    // the possible context flags, try for webgl 2 first.
    var types = ["webgl2", "experimental-webgl2", "webgl", "experimental-webgl"];

    // loop through trying different context settings.
    var ctx = types.map(function (type) {
        var tCtx = el.getContext(type, options);
        if (tCtx !== null) {
            if (type === "webgl2" || type === "experimental-webgl2") {
                isWebGL2 = true;
            }
            return tCtx;
        }
    }).filter(function (val) {
        if (val !== undefined) {
            return val;
        }
    });

    // make sure to note that this is a webgl 2 context
    if (isWebGL2) {
        window.hasWebGL2 = true;
    } else {
        window.hasWebGL2 = false;
    }

    ctx[0]["isWebGL2"] = isWebGL2;
    // just return 1 context
    return ctx[0];
}

/**
 * Sets up some WebGL constant values on top of the
 * window object for ease of use so you don't have to always have a
 * context object handy.
 * @param gl {WebGLRenderingContext} a WebGLRenderingContext
 */
function setupConstants(gl) {
    var constants = {
        "FLOAT": gl.FLOAT,
        "UNSIGNED_BYTE": gl.UNSIGNED_BYTE,
        "UNSIGNED_SHORT": gl.UNSIGNED_SHORT,
        "ARRAY_BUFFER": gl.ARRAY_BUFFER,
        "ELEMENT_BUFFER": gl.ELEMENT_ARRAY_BUFFER,
        "RGBA": gl.RGBA,
        "RGB": gl.RGB,
        "TEXTURE_2D": gl.TEXTURE_2D,
        "STATIC_DRAW": gl.STATIC_DRAW,
        "DYNAMIC_DRAW": gl.DYNAMIC_DRAW,
        "TRIANGLES": gl.TRIANGLES,
        "TRIANGLE_STRIP": gl.TRIANGLE_STRIP,
        "POINTS": gl.POINTS,
        "FRAMEBUFFER": gl.FRAMEBUFFER,
        "COLOR_ATTACHMENT0": gl.COLOR_ATTACHMENT0,
        // texture related
        "CLAMP_TO_EDGE": gl.CLAMP_TO_EDGE,
        "LINEAR": gl.LINEAR,
        "MAG_FILTER": gl.TEXTURE_MAG_FILTER,
        "MIN_FILTER": gl.TEXTURE_MIN_FILTER,
        "WRAP_S": gl.TEXTURE_WRAP_S,
        "WRAP_T": gl.TEXTURE_WRAP_T,
        "TEXTURE0": gl.TEXTURE0,
        "TEXTURE1": gl.TEXTURE1,
        "TEXTURE2": gl.TEXTURE2,

        // uniform related
        "UNIFORM_BUFFER": gl.UNIFORM_BUFFER,

        // simplify some math related stuff
        "PI": 3.14149,
        "M_PI": 3.14149, // same but Cinder alternative var
        "M_2_PI": 3.14149 * 3.14149, // same but also from Cinder in case I accidentally ever get the two mixed up
        "2_PI": 3.14149 * 3.14149,
        "sin": Math.sin,
        "cos": Math.cos,
        "tan": Math.tan,
        "random": Math.random,
        "randFloat": randFloat,
        "randInt": randInt,
        "clamp": clamp,
        "range": range
    };

    /**
     * WebGL 2 contexts directly support certain constants
     * that were previously only available via extensions.
     * Add those here.
     *
     * Your context must have a "isWebGL2" property in order for this to get
     * triggered.
     *
     * TODO at some point, should look and see if there might be native way to differentiate between ES 2.0 and 3.0 contexts
     */
    if (gl.hasOwnProperty('isWebGL2')) {

        if (gl.isWebGL2) {
            // add more color attachment constants
            constants["COLOR_ATTACHMENT1"] = gl.COLOR_ATTACHMENT1;
            constants["COLOR_ATTACHMENT2"] = gl.COLOR_ATTACHMENT2;
            constants["COLOR_ATTACHMENT3"] = gl.COLOR_ATTACHMENT3;
            constants["COLOR_ATTACHMENT4"] = gl.COLOR_ATTACHMENT4;
            constants["COLOR_ATTACHMENT5"] = gl.COLOR_ATTACHMENT5;
        }
    }

    if (!window.GL_CONSTANTS_SET) {
        for (var i in constants) {
            window[i] = constants[i];
        }
        window.GL_CONSTANTS_SET = true;
    }
}
//================= MAIN FUNCTION ==================== //

/**
 * Builds the WebGLRendering context
 * @param canvas {DomElement} an optional canvas, if you'd rather use one already in the DOM
 * @param ctxOptions {Object} options for the context
 * @param getCommonExtensions {Bool} include the common extensions for doing neat things in WebGL 1
 */
function createRenderer() {
    var _ref3 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref3$canvas = _ref3.canvas,
        canvas = _ref3$canvas === undefined ? null : _ref3$canvas,
        _ref3$ctxOptions = _ref3.ctxOptions,
        ctxOptions = _ref3$ctxOptions === undefined ? {} : _ref3$ctxOptions,
        _ref3$getCommonExtens = _ref3.getCommonExtensions,
        getCommonExtensions = _ref3$getCommonExtens === undefined ? true : _ref3$getCommonExtens,
        _ref3$width = _ref3.width,
        width = _ref3$width === undefined ? 300 : _ref3$width,
        _ref3$height = _ref3.height,
        height = _ref3$height === undefined ? 150 : _ref3$height;

    var gl = createContext(canvas, ctxOptions);
    var format = new RendererFormat(width, height);
    var ext = null;

    //setup constants
    setupConstants(gl);

    // assign some convenience functions onto the gl context
    var newProps = Object.assign(gl.__proto__, format.__proto__);
    gl.__proto__ = newProps;

    // need to do this too to get props created in constructor.
    Object.assign(gl, format);

    // if the width and height of the canvas settings are something other than the default,
    // set the new width and height.
    if (gl.width !== 300 || gl.height !== 150) {
        gl.canvas.width = gl.width;
        gl.canvas.height = gl.height;
    }

    /**
     * Fetch common extensions if we're not on WebGl 2 and
     * getCommonExtensions is true
     */
    if (getCommonExtensions) {
        if (!gl.isWebGL2) {
            ext = getExtensions(gl);
            // loop through and assign extensions onto the context as well
            for (var i in ext) {
                gl[i] = ext[i];
            }
        }
    }

    return gl;
}

/* Copyright (c) 2015, Brandon Jones, Colin MacKenzie IV.
 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:
 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.
 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE. */

/**
 * @class Common utilities
 * @name glMatrix
 */
var glMatrix = {};

// Configuration Constants
glMatrix.EPSILON = 0.000001;
glMatrix.ARRAY_TYPE = typeof Float32Array !== 'undefined' ? Float32Array : Array;
glMatrix.RANDOM = Math.random;
glMatrix.ENABLE_SIMD = false;

// Capability detection
glMatrix.SIMD_AVAILABLE = glMatrix.ARRAY_TYPE === window.Float32Array && 'SIMD' in window;
glMatrix.USE_SIMD = glMatrix.ENABLE_SIMD && glMatrix.SIMD_AVAILABLE;

/**
 * Sets the type of array used when creating new vectors and matrices
 *
 * @param {Type} type Array type, such as Float32Array or Array
 */
glMatrix.setMatrixArrayType = function (type) {
  glMatrix.ARRAY_TYPE = type;
};

var degree = Math.PI / 180;

/**
 * Convert Degree To Radian
 *
 * @param {Number} a Angle in Degrees
 */
glMatrix.toRadian = function (a) {
  return a * degree;
};

/**
 * Tests whether or not the arguments have approximately the same value, within an absolute
 * or relative tolerance of glMatrix.EPSILON (an absolute tolerance is used for values less
 * than or equal to 1.0, and a relative tolerance is used for larger values)
 *
 * @param {Number} a The first number to test.
 * @param {Number} b The second number to test.
 * @returns {Boolean} True if the numbers are approximately equal, false otherwise.
 */
glMatrix.equals = function (a, b) {
  return Math.abs(a - b) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a), Math.abs(b));
};

/* Copyright (c) 2015, Brandon Jones, Colin MacKenzie IV.
 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:
 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.
 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE. */

/**
 * @class 4x4 Matrix
 * @name mat4
 */
var mat4 = {
    scalar: {},
    SIMD: {}
};

/**
 * Creates a new identity mat4
 *
 * @returns {mat4} a new 4x4 matrix
 */
mat4.create = function () {
    var out = new glMatrix.ARRAY_TYPE(16);
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = 1;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = 1;
    out[11] = 0;
    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
    out[15] = 1;
    return out;
};

/**
 * Creates a new mat4 initialized with values from an existing matrix
 *
 * @param {mat4} a matrix to clone
 * @returns {mat4} a new 4x4 matrix
 */
mat4.clone = function (a) {
    var out = new glMatrix.ARRAY_TYPE(16);
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    out[4] = a[4];
    out[5] = a[5];
    out[6] = a[6];
    out[7] = a[7];
    out[8] = a[8];
    out[9] = a[9];
    out[10] = a[10];
    out[11] = a[11];
    out[12] = a[12];
    out[13] = a[13];
    out[14] = a[14];
    out[15] = a[15];
    return out;
};

/**
 * Copy the values from one mat4 to another
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the source matrix
 * @returns {mat4} out
 */
mat4.copy = function (out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    out[4] = a[4];
    out[5] = a[5];
    out[6] = a[6];
    out[7] = a[7];
    out[8] = a[8];
    out[9] = a[9];
    out[10] = a[10];
    out[11] = a[11];
    out[12] = a[12];
    out[13] = a[13];
    out[14] = a[14];
    out[15] = a[15];
    return out;
};

/**
 * Create a new mat4 with the given values
 *
 * @param {Number} m00 Component in column 0, row 0 position (index 0)
 * @param {Number} m01 Component in column 0, row 1 position (index 1)
 * @param {Number} m02 Component in column 0, row 2 position (index 2)
 * @param {Number} m03 Component in column 0, row 3 position (index 3)
 * @param {Number} m10 Component in column 1, row 0 position (index 4)
 * @param {Number} m11 Component in column 1, row 1 position (index 5)
 * @param {Number} m12 Component in column 1, row 2 position (index 6)
 * @param {Number} m13 Component in column 1, row 3 position (index 7)
 * @param {Number} m20 Component in column 2, row 0 position (index 8)
 * @param {Number} m21 Component in column 2, row 1 position (index 9)
 * @param {Number} m22 Component in column 2, row 2 position (index 10)
 * @param {Number} m23 Component in column 2, row 3 position (index 11)
 * @param {Number} m30 Component in column 3, row 0 position (index 12)
 * @param {Number} m31 Component in column 3, row 1 position (index 13)
 * @param {Number} m32 Component in column 3, row 2 position (index 14)
 * @param {Number} m33 Component in column 3, row 3 position (index 15)
 * @returns {mat4} A new mat4
 */
mat4.fromValues = function (m00, m01, m02, m03, m10, m11, m12, m13, m20, m21, m22, m23, m30, m31, m32, m33) {
    var out = new glMatrix.ARRAY_TYPE(16);
    out[0] = m00;
    out[1] = m01;
    out[2] = m02;
    out[3] = m03;
    out[4] = m10;
    out[5] = m11;
    out[6] = m12;
    out[7] = m13;
    out[8] = m20;
    out[9] = m21;
    out[10] = m22;
    out[11] = m23;
    out[12] = m30;
    out[13] = m31;
    out[14] = m32;
    out[15] = m33;
    return out;
};

/**
 * Set the components of a mat4 to the given values
 *
 * @param {mat4} out the receiving matrix
 * @param {Number} m00 Component in column 0, row 0 position (index 0)
 * @param {Number} m01 Component in column 0, row 1 position (index 1)
 * @param {Number} m02 Component in column 0, row 2 position (index 2)
 * @param {Number} m03 Component in column 0, row 3 position (index 3)
 * @param {Number} m10 Component in column 1, row 0 position (index 4)
 * @param {Number} m11 Component in column 1, row 1 position (index 5)
 * @param {Number} m12 Component in column 1, row 2 position (index 6)
 * @param {Number} m13 Component in column 1, row 3 position (index 7)
 * @param {Number} m20 Component in column 2, row 0 position (index 8)
 * @param {Number} m21 Component in column 2, row 1 position (index 9)
 * @param {Number} m22 Component in column 2, row 2 position (index 10)
 * @param {Number} m23 Component in column 2, row 3 position (index 11)
 * @param {Number} m30 Component in column 3, row 0 position (index 12)
 * @param {Number} m31 Component in column 3, row 1 position (index 13)
 * @param {Number} m32 Component in column 3, row 2 position (index 14)
 * @param {Number} m33 Component in column 3, row 3 position (index 15)
 * @returns {mat4} out
 */
mat4.set = function (out, m00, m01, m02, m03, m10, m11, m12, m13, m20, m21, m22, m23, m30, m31, m32, m33) {
    out[0] = m00;
    out[1] = m01;
    out[2] = m02;
    out[3] = m03;
    out[4] = m10;
    out[5] = m11;
    out[6] = m12;
    out[7] = m13;
    out[8] = m20;
    out[9] = m21;
    out[10] = m22;
    out[11] = m23;
    out[12] = m30;
    out[13] = m31;
    out[14] = m32;
    out[15] = m33;
    return out;
};

/**
 * Set a mat4 to the identity matrix
 *
 * @param {mat4} out the receiving matrix
 * @returns {mat4} out
 */
mat4.identity = function (out) {
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = 1;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = 1;
    out[11] = 0;
    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
    out[15] = 1;
    return out;
};

/**
 * Transpose the values of a mat4 not using SIMD
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the source matrix
 * @returns {mat4} out
 */
mat4.scalar.transpose = function (out, a) {
    // If we are transposing ourselves we can skip a few steps but have to cache some values
    if (out === a) {
        var a01 = a[1],
            a02 = a[2],
            a03 = a[3],
            a12 = a[6],
            a13 = a[7],
            a23 = a[11];

        out[1] = a[4];
        out[2] = a[8];
        out[3] = a[12];
        out[4] = a01;
        out[6] = a[9];
        out[7] = a[13];
        out[8] = a02;
        out[9] = a12;
        out[11] = a[14];
        out[12] = a03;
        out[13] = a13;
        out[14] = a23;
    } else {
        out[0] = a[0];
        out[1] = a[4];
        out[2] = a[8];
        out[3] = a[12];
        out[4] = a[1];
        out[5] = a[5];
        out[6] = a[9];
        out[7] = a[13];
        out[8] = a[2];
        out[9] = a[6];
        out[10] = a[10];
        out[11] = a[14];
        out[12] = a[3];
        out[13] = a[7];
        out[14] = a[11];
        out[15] = a[15];
    }

    return out;
};

/**
 * Transpose the values of a mat4 using SIMD
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the source matrix
 * @returns {mat4} out
 */
mat4.SIMD.transpose = function (out, a) {
    var a0, a1, a2, a3, tmp01, tmp23, out0, out1, out2, out3;

    a0 = SIMD.Float32x4.load(a, 0);
    a1 = SIMD.Float32x4.load(a, 4);
    a2 = SIMD.Float32x4.load(a, 8);
    a3 = SIMD.Float32x4.load(a, 12);

    tmp01 = SIMD.Float32x4.shuffle(a0, a1, 0, 1, 4, 5);
    tmp23 = SIMD.Float32x4.shuffle(a2, a3, 0, 1, 4, 5);
    out0 = SIMD.Float32x4.shuffle(tmp01, tmp23, 0, 2, 4, 6);
    out1 = SIMD.Float32x4.shuffle(tmp01, tmp23, 1, 3, 5, 7);
    SIMD.Float32x4.store(out, 0, out0);
    SIMD.Float32x4.store(out, 4, out1);

    tmp01 = SIMD.Float32x4.shuffle(a0, a1, 2, 3, 6, 7);
    tmp23 = SIMD.Float32x4.shuffle(a2, a3, 2, 3, 6, 7);
    out2 = SIMD.Float32x4.shuffle(tmp01, tmp23, 0, 2, 4, 6);
    out3 = SIMD.Float32x4.shuffle(tmp01, tmp23, 1, 3, 5, 7);
    SIMD.Float32x4.store(out, 8, out2);
    SIMD.Float32x4.store(out, 12, out3);

    return out;
};

/**
 * Transpse a mat4 using SIMD if available and enabled
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the source matrix
 * @returns {mat4} out
 */
mat4.transpose = glMatrix.USE_SIMD ? mat4.SIMD.transpose : mat4.scalar.transpose;

/**
 * Inverts a mat4 not using SIMD
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the source matrix
 * @returns {mat4} out
 */
mat4.scalar.invert = function (out, a) {
    var a00 = a[0],
        a01 = a[1],
        a02 = a[2],
        a03 = a[3],
        a10 = a[4],
        a11 = a[5],
        a12 = a[6],
        a13 = a[7],
        a20 = a[8],
        a21 = a[9],
        a22 = a[10],
        a23 = a[11],
        a30 = a[12],
        a31 = a[13],
        a32 = a[14],
        a33 = a[15],
        b00 = a00 * a11 - a01 * a10,
        b01 = a00 * a12 - a02 * a10,
        b02 = a00 * a13 - a03 * a10,
        b03 = a01 * a12 - a02 * a11,
        b04 = a01 * a13 - a03 * a11,
        b05 = a02 * a13 - a03 * a12,
        b06 = a20 * a31 - a21 * a30,
        b07 = a20 * a32 - a22 * a30,
        b08 = a20 * a33 - a23 * a30,
        b09 = a21 * a32 - a22 * a31,
        b10 = a21 * a33 - a23 * a31,
        b11 = a22 * a33 - a23 * a32,


    // Calculate the determinant
    det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;

    if (!det) {
        return null;
    }
    det = 1.0 / det;

    out[0] = (a11 * b11 - a12 * b10 + a13 * b09) * det;
    out[1] = (a02 * b10 - a01 * b11 - a03 * b09) * det;
    out[2] = (a31 * b05 - a32 * b04 + a33 * b03) * det;
    out[3] = (a22 * b04 - a21 * b05 - a23 * b03) * det;
    out[4] = (a12 * b08 - a10 * b11 - a13 * b07) * det;
    out[5] = (a00 * b11 - a02 * b08 + a03 * b07) * det;
    out[6] = (a32 * b02 - a30 * b05 - a33 * b01) * det;
    out[7] = (a20 * b05 - a22 * b02 + a23 * b01) * det;
    out[8] = (a10 * b10 - a11 * b08 + a13 * b06) * det;
    out[9] = (a01 * b08 - a00 * b10 - a03 * b06) * det;
    out[10] = (a30 * b04 - a31 * b02 + a33 * b00) * det;
    out[11] = (a21 * b02 - a20 * b04 - a23 * b00) * det;
    out[12] = (a11 * b07 - a10 * b09 - a12 * b06) * det;
    out[13] = (a00 * b09 - a01 * b07 + a02 * b06) * det;
    out[14] = (a31 * b01 - a30 * b03 - a32 * b00) * det;
    out[15] = (a20 * b03 - a21 * b01 + a22 * b00) * det;

    return out;
};

/**
 * Inverts a mat4 using SIMD
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the source matrix
 * @returns {mat4} out
 */
mat4.SIMD.invert = function (out, a) {
    var row0,
        row1,
        row2,
        row3,
        tmp1,
        minor0,
        minor1,
        minor2,
        minor3,
        det,
        a0 = SIMD.Float32x4.load(a, 0),
        a1 = SIMD.Float32x4.load(a, 4),
        a2 = SIMD.Float32x4.load(a, 8),
        a3 = SIMD.Float32x4.load(a, 12);

    // Compute matrix adjugate
    tmp1 = SIMD.Float32x4.shuffle(a0, a1, 0, 1, 4, 5);
    row1 = SIMD.Float32x4.shuffle(a2, a3, 0, 1, 4, 5);
    row0 = SIMD.Float32x4.shuffle(tmp1, row1, 0, 2, 4, 6);
    row1 = SIMD.Float32x4.shuffle(row1, tmp1, 1, 3, 5, 7);
    tmp1 = SIMD.Float32x4.shuffle(a0, a1, 2, 3, 6, 7);
    row3 = SIMD.Float32x4.shuffle(a2, a3, 2, 3, 6, 7);
    row2 = SIMD.Float32x4.shuffle(tmp1, row3, 0, 2, 4, 6);
    row3 = SIMD.Float32x4.shuffle(row3, tmp1, 1, 3, 5, 7);

    tmp1 = SIMD.Float32x4.mul(row2, row3);
    tmp1 = SIMD.Float32x4.swizzle(tmp1, 1, 0, 3, 2);
    minor0 = SIMD.Float32x4.mul(row1, tmp1);
    minor1 = SIMD.Float32x4.mul(row0, tmp1);
    tmp1 = SIMD.Float32x4.swizzle(tmp1, 2, 3, 0, 1);
    minor0 = SIMD.Float32x4.sub(SIMD.Float32x4.mul(row1, tmp1), minor0);
    minor1 = SIMD.Float32x4.sub(SIMD.Float32x4.mul(row0, tmp1), minor1);
    minor1 = SIMD.Float32x4.swizzle(minor1, 2, 3, 0, 1);

    tmp1 = SIMD.Float32x4.mul(row1, row2);
    tmp1 = SIMD.Float32x4.swizzle(tmp1, 1, 0, 3, 2);
    minor0 = SIMD.Float32x4.add(SIMD.Float32x4.mul(row3, tmp1), minor0);
    minor3 = SIMD.Float32x4.mul(row0, tmp1);
    tmp1 = SIMD.Float32x4.swizzle(tmp1, 2, 3, 0, 1);
    minor0 = SIMD.Float32x4.sub(minor0, SIMD.Float32x4.mul(row3, tmp1));
    minor3 = SIMD.Float32x4.sub(SIMD.Float32x4.mul(row0, tmp1), minor3);
    minor3 = SIMD.Float32x4.swizzle(minor3, 2, 3, 0, 1);

    tmp1 = SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(row1, 2, 3, 0, 1), row3);
    tmp1 = SIMD.Float32x4.swizzle(tmp1, 1, 0, 3, 2);
    row2 = SIMD.Float32x4.swizzle(row2, 2, 3, 0, 1);
    minor0 = SIMD.Float32x4.add(SIMD.Float32x4.mul(row2, tmp1), minor0);
    minor2 = SIMD.Float32x4.mul(row0, tmp1);
    tmp1 = SIMD.Float32x4.swizzle(tmp1, 2, 3, 0, 1);
    minor0 = SIMD.Float32x4.sub(minor0, SIMD.Float32x4.mul(row2, tmp1));
    minor2 = SIMD.Float32x4.sub(SIMD.Float32x4.mul(row0, tmp1), minor2);
    minor2 = SIMD.Float32x4.swizzle(minor2, 2, 3, 0, 1);

    tmp1 = SIMD.Float32x4.mul(row0, row1);
    tmp1 = SIMD.Float32x4.swizzle(tmp1, 1, 0, 3, 2);
    minor2 = SIMD.Float32x4.add(SIMD.Float32x4.mul(row3, tmp1), minor2);
    minor3 = SIMD.Float32x4.sub(SIMD.Float32x4.mul(row2, tmp1), minor3);
    tmp1 = SIMD.Float32x4.swizzle(tmp1, 2, 3, 0, 1);
    minor2 = SIMD.Float32x4.sub(SIMD.Float32x4.mul(row3, tmp1), minor2);
    minor3 = SIMD.Float32x4.sub(minor3, SIMD.Float32x4.mul(row2, tmp1));

    tmp1 = SIMD.Float32x4.mul(row0, row3);
    tmp1 = SIMD.Float32x4.swizzle(tmp1, 1, 0, 3, 2);
    minor1 = SIMD.Float32x4.sub(minor1, SIMD.Float32x4.mul(row2, tmp1));
    minor2 = SIMD.Float32x4.add(SIMD.Float32x4.mul(row1, tmp1), minor2);
    tmp1 = SIMD.Float32x4.swizzle(tmp1, 2, 3, 0, 1);
    minor1 = SIMD.Float32x4.add(SIMD.Float32x4.mul(row2, tmp1), minor1);
    minor2 = SIMD.Float32x4.sub(minor2, SIMD.Float32x4.mul(row1, tmp1));

    tmp1 = SIMD.Float32x4.mul(row0, row2);
    tmp1 = SIMD.Float32x4.swizzle(tmp1, 1, 0, 3, 2);
    minor1 = SIMD.Float32x4.add(SIMD.Float32x4.mul(row3, tmp1), minor1);
    minor3 = SIMD.Float32x4.sub(minor3, SIMD.Float32x4.mul(row1, tmp1));
    tmp1 = SIMD.Float32x4.swizzle(tmp1, 2, 3, 0, 1);
    minor1 = SIMD.Float32x4.sub(minor1, SIMD.Float32x4.mul(row3, tmp1));
    minor3 = SIMD.Float32x4.add(SIMD.Float32x4.mul(row1, tmp1), minor3);

    // Compute matrix determinant
    det = SIMD.Float32x4.mul(row0, minor0);
    det = SIMD.Float32x4.add(SIMD.Float32x4.swizzle(det, 2, 3, 0, 1), det);
    det = SIMD.Float32x4.add(SIMD.Float32x4.swizzle(det, 1, 0, 3, 2), det);
    tmp1 = SIMD.Float32x4.reciprocalApproximation(det);
    det = SIMD.Float32x4.sub(SIMD.Float32x4.add(tmp1, tmp1), SIMD.Float32x4.mul(det, SIMD.Float32x4.mul(tmp1, tmp1)));
    det = SIMD.Float32x4.swizzle(det, 0, 0, 0, 0);
    if (!det) {
        return null;
    }

    // Compute matrix inverse
    SIMD.Float32x4.store(out, 0, SIMD.Float32x4.mul(det, minor0));
    SIMD.Float32x4.store(out, 4, SIMD.Float32x4.mul(det, minor1));
    SIMD.Float32x4.store(out, 8, SIMD.Float32x4.mul(det, minor2));
    SIMD.Float32x4.store(out, 12, SIMD.Float32x4.mul(det, minor3));
    return out;
};

/**
 * Inverts a mat4 using SIMD if available and enabled
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the source matrix
 * @returns {mat4} out
 */
mat4.invert = glMatrix.USE_SIMD ? mat4.SIMD.invert : mat4.scalar.invert;

/**
 * Calculates the adjugate of a mat4 not using SIMD
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the source matrix
 * @returns {mat4} out
 */
mat4.scalar.adjoint = function (out, a) {
    var a00 = a[0],
        a01 = a[1],
        a02 = a[2],
        a03 = a[3],
        a10 = a[4],
        a11 = a[5],
        a12 = a[6],
        a13 = a[7],
        a20 = a[8],
        a21 = a[9],
        a22 = a[10],
        a23 = a[11],
        a30 = a[12],
        a31 = a[13],
        a32 = a[14],
        a33 = a[15];

    out[0] = a11 * (a22 * a33 - a23 * a32) - a21 * (a12 * a33 - a13 * a32) + a31 * (a12 * a23 - a13 * a22);
    out[1] = -(a01 * (a22 * a33 - a23 * a32) - a21 * (a02 * a33 - a03 * a32) + a31 * (a02 * a23 - a03 * a22));
    out[2] = a01 * (a12 * a33 - a13 * a32) - a11 * (a02 * a33 - a03 * a32) + a31 * (a02 * a13 - a03 * a12);
    out[3] = -(a01 * (a12 * a23 - a13 * a22) - a11 * (a02 * a23 - a03 * a22) + a21 * (a02 * a13 - a03 * a12));
    out[4] = -(a10 * (a22 * a33 - a23 * a32) - a20 * (a12 * a33 - a13 * a32) + a30 * (a12 * a23 - a13 * a22));
    out[5] = a00 * (a22 * a33 - a23 * a32) - a20 * (a02 * a33 - a03 * a32) + a30 * (a02 * a23 - a03 * a22);
    out[6] = -(a00 * (a12 * a33 - a13 * a32) - a10 * (a02 * a33 - a03 * a32) + a30 * (a02 * a13 - a03 * a12));
    out[7] = a00 * (a12 * a23 - a13 * a22) - a10 * (a02 * a23 - a03 * a22) + a20 * (a02 * a13 - a03 * a12);
    out[8] = a10 * (a21 * a33 - a23 * a31) - a20 * (a11 * a33 - a13 * a31) + a30 * (a11 * a23 - a13 * a21);
    out[9] = -(a00 * (a21 * a33 - a23 * a31) - a20 * (a01 * a33 - a03 * a31) + a30 * (a01 * a23 - a03 * a21));
    out[10] = a00 * (a11 * a33 - a13 * a31) - a10 * (a01 * a33 - a03 * a31) + a30 * (a01 * a13 - a03 * a11);
    out[11] = -(a00 * (a11 * a23 - a13 * a21) - a10 * (a01 * a23 - a03 * a21) + a20 * (a01 * a13 - a03 * a11));
    out[12] = -(a10 * (a21 * a32 - a22 * a31) - a20 * (a11 * a32 - a12 * a31) + a30 * (a11 * a22 - a12 * a21));
    out[13] = a00 * (a21 * a32 - a22 * a31) - a20 * (a01 * a32 - a02 * a31) + a30 * (a01 * a22 - a02 * a21);
    out[14] = -(a00 * (a11 * a32 - a12 * a31) - a10 * (a01 * a32 - a02 * a31) + a30 * (a01 * a12 - a02 * a11));
    out[15] = a00 * (a11 * a22 - a12 * a21) - a10 * (a01 * a22 - a02 * a21) + a20 * (a01 * a12 - a02 * a11);
    return out;
};

/**
 * Calculates the adjugate of a mat4 using SIMD
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the source matrix
 * @returns {mat4} out
 */
mat4.SIMD.adjoint = function (out, a) {
    var a0, a1, a2, a3;
    var row0, row1, row2, row3;
    var tmp1;
    var minor0, minor1, minor2, minor3;

    a0 = SIMD.Float32x4.load(a, 0);
    a1 = SIMD.Float32x4.load(a, 4);
    a2 = SIMD.Float32x4.load(a, 8);
    a3 = SIMD.Float32x4.load(a, 12);

    // Transpose the source matrix.  Sort of.  Not a true transpose operation
    tmp1 = SIMD.Float32x4.shuffle(a0, a1, 0, 1, 4, 5);
    row1 = SIMD.Float32x4.shuffle(a2, a3, 0, 1, 4, 5);
    row0 = SIMD.Float32x4.shuffle(tmp1, row1, 0, 2, 4, 6);
    row1 = SIMD.Float32x4.shuffle(row1, tmp1, 1, 3, 5, 7);

    tmp1 = SIMD.Float32x4.shuffle(a0, a1, 2, 3, 6, 7);
    row3 = SIMD.Float32x4.shuffle(a2, a3, 2, 3, 6, 7);
    row2 = SIMD.Float32x4.shuffle(tmp1, row3, 0, 2, 4, 6);
    row3 = SIMD.Float32x4.shuffle(row3, tmp1, 1, 3, 5, 7);

    tmp1 = SIMD.Float32x4.mul(row2, row3);
    tmp1 = SIMD.Float32x4.swizzle(tmp1, 1, 0, 3, 2);
    minor0 = SIMD.Float32x4.mul(row1, tmp1);
    minor1 = SIMD.Float32x4.mul(row0, tmp1);
    tmp1 = SIMD.Float32x4.swizzle(tmp1, 2, 3, 0, 1);
    minor0 = SIMD.Float32x4.sub(SIMD.Float32x4.mul(row1, tmp1), minor0);
    minor1 = SIMD.Float32x4.sub(SIMD.Float32x4.mul(row0, tmp1), minor1);
    minor1 = SIMD.Float32x4.swizzle(minor1, 2, 3, 0, 1);

    tmp1 = SIMD.Float32x4.mul(row1, row2);
    tmp1 = SIMD.Float32x4.swizzle(tmp1, 1, 0, 3, 2);
    minor0 = SIMD.Float32x4.add(SIMD.Float32x4.mul(row3, tmp1), minor0);
    minor3 = SIMD.Float32x4.mul(row0, tmp1);
    tmp1 = SIMD.Float32x4.swizzle(tmp1, 2, 3, 0, 1);
    minor0 = SIMD.Float32x4.sub(minor0, SIMD.Float32x4.mul(row3, tmp1));
    minor3 = SIMD.Float32x4.sub(SIMD.Float32x4.mul(row0, tmp1), minor3);
    minor3 = SIMD.Float32x4.swizzle(minor3, 2, 3, 0, 1);

    tmp1 = SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(row1, 2, 3, 0, 1), row3);
    tmp1 = SIMD.Float32x4.swizzle(tmp1, 1, 0, 3, 2);
    row2 = SIMD.Float32x4.swizzle(row2, 2, 3, 0, 1);
    minor0 = SIMD.Float32x4.add(SIMD.Float32x4.mul(row2, tmp1), minor0);
    minor2 = SIMD.Float32x4.mul(row0, tmp1);
    tmp1 = SIMD.Float32x4.swizzle(tmp1, 2, 3, 0, 1);
    minor0 = SIMD.Float32x4.sub(minor0, SIMD.Float32x4.mul(row2, tmp1));
    minor2 = SIMD.Float32x4.sub(SIMD.Float32x4.mul(row0, tmp1), minor2);
    minor2 = SIMD.Float32x4.swizzle(minor2, 2, 3, 0, 1);

    tmp1 = SIMD.Float32x4.mul(row0, row1);
    tmp1 = SIMD.Float32x4.swizzle(tmp1, 1, 0, 3, 2);
    minor2 = SIMD.Float32x4.add(SIMD.Float32x4.mul(row3, tmp1), minor2);
    minor3 = SIMD.Float32x4.sub(SIMD.Float32x4.mul(row2, tmp1), minor3);
    tmp1 = SIMD.Float32x4.swizzle(tmp1, 2, 3, 0, 1);
    minor2 = SIMD.Float32x4.sub(SIMD.Float32x4.mul(row3, tmp1), minor2);
    minor3 = SIMD.Float32x4.sub(minor3, SIMD.Float32x4.mul(row2, tmp1));

    tmp1 = SIMD.Float32x4.mul(row0, row3);
    tmp1 = SIMD.Float32x4.swizzle(tmp1, 1, 0, 3, 2);
    minor1 = SIMD.Float32x4.sub(minor1, SIMD.Float32x4.mul(row2, tmp1));
    minor2 = SIMD.Float32x4.add(SIMD.Float32x4.mul(row1, tmp1), minor2);
    tmp1 = SIMD.Float32x4.swizzle(tmp1, 2, 3, 0, 1);
    minor1 = SIMD.Float32x4.add(SIMD.Float32x4.mul(row2, tmp1), minor1);
    minor2 = SIMD.Float32x4.sub(minor2, SIMD.Float32x4.mul(row1, tmp1));

    tmp1 = SIMD.Float32x4.mul(row0, row2);
    tmp1 = SIMD.Float32x4.swizzle(tmp1, 1, 0, 3, 2);
    minor1 = SIMD.Float32x4.add(SIMD.Float32x4.mul(row3, tmp1), minor1);
    minor3 = SIMD.Float32x4.sub(minor3, SIMD.Float32x4.mul(row1, tmp1));
    tmp1 = SIMD.Float32x4.swizzle(tmp1, 2, 3, 0, 1);
    minor1 = SIMD.Float32x4.sub(minor1, SIMD.Float32x4.mul(row3, tmp1));
    minor3 = SIMD.Float32x4.add(SIMD.Float32x4.mul(row1, tmp1), minor3);

    SIMD.Float32x4.store(out, 0, minor0);
    SIMD.Float32x4.store(out, 4, minor1);
    SIMD.Float32x4.store(out, 8, minor2);
    SIMD.Float32x4.store(out, 12, minor3);
    return out;
};

/**
 * Calculates the adjugate of a mat4 using SIMD if available and enabled
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the source matrix
 * @returns {mat4} out
 */
mat4.adjoint = glMatrix.USE_SIMD ? mat4.SIMD.adjoint : mat4.scalar.adjoint;

/**
 * Calculates the determinant of a mat4
 *
 * @param {mat4} a the source matrix
 * @returns {Number} determinant of a
 */
mat4.determinant = function (a) {
    var a00 = a[0],
        a01 = a[1],
        a02 = a[2],
        a03 = a[3],
        a10 = a[4],
        a11 = a[5],
        a12 = a[6],
        a13 = a[7],
        a20 = a[8],
        a21 = a[9],
        a22 = a[10],
        a23 = a[11],
        a30 = a[12],
        a31 = a[13],
        a32 = a[14],
        a33 = a[15],
        b00 = a00 * a11 - a01 * a10,
        b01 = a00 * a12 - a02 * a10,
        b02 = a00 * a13 - a03 * a10,
        b03 = a01 * a12 - a02 * a11,
        b04 = a01 * a13 - a03 * a11,
        b05 = a02 * a13 - a03 * a12,
        b06 = a20 * a31 - a21 * a30,
        b07 = a20 * a32 - a22 * a30,
        b08 = a20 * a33 - a23 * a30,
        b09 = a21 * a32 - a22 * a31,
        b10 = a21 * a33 - a23 * a31,
        b11 = a22 * a33 - a23 * a32;

    // Calculate the determinant
    return b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;
};

/**
 * Multiplies two mat4's explicitly using SIMD
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the first operand, must be a Float32Array
 * @param {mat4} b the second operand, must be a Float32Array
 * @returns {mat4} out
 */
mat4.SIMD.multiply = function (out, a, b) {
    var a0 = SIMD.Float32x4.load(a, 0);
    var a1 = SIMD.Float32x4.load(a, 4);
    var a2 = SIMD.Float32x4.load(a, 8);
    var a3 = SIMD.Float32x4.load(a, 12);

    var b0 = SIMD.Float32x4.load(b, 0);
    var out0 = SIMD.Float32x4.add(SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(b0, 0, 0, 0, 0), a0), SIMD.Float32x4.add(SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(b0, 1, 1, 1, 1), a1), SIMD.Float32x4.add(SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(b0, 2, 2, 2, 2), a2), SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(b0, 3, 3, 3, 3), a3))));
    SIMD.Float32x4.store(out, 0, out0);

    var b1 = SIMD.Float32x4.load(b, 4);
    var out1 = SIMD.Float32x4.add(SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(b1, 0, 0, 0, 0), a0), SIMD.Float32x4.add(SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(b1, 1, 1, 1, 1), a1), SIMD.Float32x4.add(SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(b1, 2, 2, 2, 2), a2), SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(b1, 3, 3, 3, 3), a3))));
    SIMD.Float32x4.store(out, 4, out1);

    var b2 = SIMD.Float32x4.load(b, 8);
    var out2 = SIMD.Float32x4.add(SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(b2, 0, 0, 0, 0), a0), SIMD.Float32x4.add(SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(b2, 1, 1, 1, 1), a1), SIMD.Float32x4.add(SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(b2, 2, 2, 2, 2), a2), SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(b2, 3, 3, 3, 3), a3))));
    SIMD.Float32x4.store(out, 8, out2);

    var b3 = SIMD.Float32x4.load(b, 12);
    var out3 = SIMD.Float32x4.add(SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(b3, 0, 0, 0, 0), a0), SIMD.Float32x4.add(SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(b3, 1, 1, 1, 1), a1), SIMD.Float32x4.add(SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(b3, 2, 2, 2, 2), a2), SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(b3, 3, 3, 3, 3), a3))));
    SIMD.Float32x4.store(out, 12, out3);

    return out;
};

/**
 * Multiplies two mat4's explicitly not using SIMD
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the first operand
 * @param {mat4} b the second operand
 * @returns {mat4} out
 */
mat4.scalar.multiply = function (out, a, b) {
    var a00 = a[0],
        a01 = a[1],
        a02 = a[2],
        a03 = a[3],
        a10 = a[4],
        a11 = a[5],
        a12 = a[6],
        a13 = a[7],
        a20 = a[8],
        a21 = a[9],
        a22 = a[10],
        a23 = a[11],
        a30 = a[12],
        a31 = a[13],
        a32 = a[14],
        a33 = a[15];

    // Cache only the current line of the second matrix
    var b0 = b[0],
        b1 = b[1],
        b2 = b[2],
        b3 = b[3];
    out[0] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
    out[1] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
    out[2] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
    out[3] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;

    b0 = b[4];b1 = b[5];b2 = b[6];b3 = b[7];
    out[4] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
    out[5] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
    out[6] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
    out[7] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;

    b0 = b[8];b1 = b[9];b2 = b[10];b3 = b[11];
    out[8] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
    out[9] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
    out[10] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
    out[11] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;

    b0 = b[12];b1 = b[13];b2 = b[14];b3 = b[15];
    out[12] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
    out[13] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
    out[14] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
    out[15] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
    return out;
};

/**
 * Multiplies two mat4's using SIMD if available and enabled
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the first operand
 * @param {mat4} b the second operand
 * @returns {mat4} out
 */
mat4.multiply = glMatrix.USE_SIMD ? mat4.SIMD.multiply : mat4.scalar.multiply;

/**
 * Alias for {@link mat4.multiply}
 * @function
 */
mat4.mul = mat4.multiply;

/**
 * Translate a mat4 by the given vector not using SIMD
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to translate
 * @param {vec3} v vector to translate by
 * @returns {mat4} out
 */
mat4.scalar.translate = function (out, a, v) {
    var x = v[0],
        y = v[1],
        z = v[2],
        a00,
        a01,
        a02,
        a03,
        a10,
        a11,
        a12,
        a13,
        a20,
        a21,
        a22,
        a23;

    if (a === out) {
        out[12] = a[0] * x + a[4] * y + a[8] * z + a[12];
        out[13] = a[1] * x + a[5] * y + a[9] * z + a[13];
        out[14] = a[2] * x + a[6] * y + a[10] * z + a[14];
        out[15] = a[3] * x + a[7] * y + a[11] * z + a[15];
    } else {
        a00 = a[0];a01 = a[1];a02 = a[2];a03 = a[3];
        a10 = a[4];a11 = a[5];a12 = a[6];a13 = a[7];
        a20 = a[8];a21 = a[9];a22 = a[10];a23 = a[11];

        out[0] = a00;out[1] = a01;out[2] = a02;out[3] = a03;
        out[4] = a10;out[5] = a11;out[6] = a12;out[7] = a13;
        out[8] = a20;out[9] = a21;out[10] = a22;out[11] = a23;

        out[12] = a00 * x + a10 * y + a20 * z + a[12];
        out[13] = a01 * x + a11 * y + a21 * z + a[13];
        out[14] = a02 * x + a12 * y + a22 * z + a[14];
        out[15] = a03 * x + a13 * y + a23 * z + a[15];
    }

    return out;
};

/**
 * Translates a mat4 by the given vector using SIMD
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to translate
 * @param {vec3} v vector to translate by
 * @returns {mat4} out
 */
mat4.SIMD.translate = function (out, a, v) {
    var a0 = SIMD.Float32x4.load(a, 0),
        a1 = SIMD.Float32x4.load(a, 4),
        a2 = SIMD.Float32x4.load(a, 8),
        a3 = SIMD.Float32x4.load(a, 12),
        vec = SIMD.Float32x4(v[0], v[1], v[2], 0);

    if (a !== out) {
        out[0] = a[0];out[1] = a[1];out[2] = a[2];out[3] = a[3];
        out[4] = a[4];out[5] = a[5];out[6] = a[6];out[7] = a[7];
        out[8] = a[8];out[9] = a[9];out[10] = a[10];out[11] = a[11];
    }

    a0 = SIMD.Float32x4.mul(a0, SIMD.Float32x4.swizzle(vec, 0, 0, 0, 0));
    a1 = SIMD.Float32x4.mul(a1, SIMD.Float32x4.swizzle(vec, 1, 1, 1, 1));
    a2 = SIMD.Float32x4.mul(a2, SIMD.Float32x4.swizzle(vec, 2, 2, 2, 2));

    var t0 = SIMD.Float32x4.add(a0, SIMD.Float32x4.add(a1, SIMD.Float32x4.add(a2, a3)));
    SIMD.Float32x4.store(out, 12, t0);

    return out;
};

/**
 * Translates a mat4 by the given vector using SIMD if available and enabled
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to translate
 * @param {vec3} v vector to translate by
 * @returns {mat4} out
 */
mat4.translate = glMatrix.USE_SIMD ? mat4.SIMD.translate : mat4.scalar.translate;

/**
 * Scales the mat4 by the dimensions in the given vec3 not using vectorization
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to scale
 * @param {vec3} v the vec3 to scale the matrix by
 * @returns {mat4} out
 **/
mat4.scalar.scale = function (out, a, v) {
    var x = v[0],
        y = v[1],
        z = v[2];

    out[0] = a[0] * x;
    out[1] = a[1] * x;
    out[2] = a[2] * x;
    out[3] = a[3] * x;
    out[4] = a[4] * y;
    out[5] = a[5] * y;
    out[6] = a[6] * y;
    out[7] = a[7] * y;
    out[8] = a[8] * z;
    out[9] = a[9] * z;
    out[10] = a[10] * z;
    out[11] = a[11] * z;
    out[12] = a[12];
    out[13] = a[13];
    out[14] = a[14];
    out[15] = a[15];
    return out;
};

/**
 * Scales the mat4 by the dimensions in the given vec3 using vectorization
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to scale
 * @param {vec3} v the vec3 to scale the matrix by
 * @returns {mat4} out
 **/
mat4.SIMD.scale = function (out, a, v) {
    var a0, a1, a2;
    var vec = SIMD.Float32x4(v[0], v[1], v[2], 0);

    a0 = SIMD.Float32x4.load(a, 0);
    SIMD.Float32x4.store(out, 0, SIMD.Float32x4.mul(a0, SIMD.Float32x4.swizzle(vec, 0, 0, 0, 0)));

    a1 = SIMD.Float32x4.load(a, 4);
    SIMD.Float32x4.store(out, 4, SIMD.Float32x4.mul(a1, SIMD.Float32x4.swizzle(vec, 1, 1, 1, 1)));

    a2 = SIMD.Float32x4.load(a, 8);
    SIMD.Float32x4.store(out, 8, SIMD.Float32x4.mul(a2, SIMD.Float32x4.swizzle(vec, 2, 2, 2, 2)));

    out[12] = a[12];
    out[13] = a[13];
    out[14] = a[14];
    out[15] = a[15];
    return out;
};

/**
 * Scales the mat4 by the dimensions in the given vec3 using SIMD if available and enabled
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to scale
 * @param {vec3} v the vec3 to scale the matrix by
 * @returns {mat4} out
 */
mat4.scale = glMatrix.USE_SIMD ? mat4.SIMD.scale : mat4.scalar.scale;

/**
 * Rotates a mat4 by the given angle around the given axis
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @param {vec3} axis the axis to rotate around
 * @returns {mat4} out
 */
mat4.rotate = function (out, a, rad, axis) {
    var x = axis[0],
        y = axis[1],
        z = axis[2],
        len = Math.sqrt(x * x + y * y + z * z),
        s,
        c,
        t,
        a00,
        a01,
        a02,
        a03,
        a10,
        a11,
        a12,
        a13,
        a20,
        a21,
        a22,
        a23,
        b00,
        b01,
        b02,
        b10,
        b11,
        b12,
        b20,
        b21,
        b22;

    if (Math.abs(len) < glMatrix.EPSILON) {
        return null;
    }

    len = 1 / len;
    x *= len;
    y *= len;
    z *= len;

    s = Math.sin(rad);
    c = Math.cos(rad);
    t = 1 - c;

    a00 = a[0];a01 = a[1];a02 = a[2];a03 = a[3];
    a10 = a[4];a11 = a[5];a12 = a[6];a13 = a[7];
    a20 = a[8];a21 = a[9];a22 = a[10];a23 = a[11];

    // Construct the elements of the rotation matrix
    b00 = x * x * t + c;b01 = y * x * t + z * s;b02 = z * x * t - y * s;
    b10 = x * y * t - z * s;b11 = y * y * t + c;b12 = z * y * t + x * s;
    b20 = x * z * t + y * s;b21 = y * z * t - x * s;b22 = z * z * t + c;

    // Perform rotation-specific matrix multiplication
    out[0] = a00 * b00 + a10 * b01 + a20 * b02;
    out[1] = a01 * b00 + a11 * b01 + a21 * b02;
    out[2] = a02 * b00 + a12 * b01 + a22 * b02;
    out[3] = a03 * b00 + a13 * b01 + a23 * b02;
    out[4] = a00 * b10 + a10 * b11 + a20 * b12;
    out[5] = a01 * b10 + a11 * b11 + a21 * b12;
    out[6] = a02 * b10 + a12 * b11 + a22 * b12;
    out[7] = a03 * b10 + a13 * b11 + a23 * b12;
    out[8] = a00 * b20 + a10 * b21 + a20 * b22;
    out[9] = a01 * b20 + a11 * b21 + a21 * b22;
    out[10] = a02 * b20 + a12 * b21 + a22 * b22;
    out[11] = a03 * b20 + a13 * b21 + a23 * b22;

    if (a !== out) {
        // If the source and destination differ, copy the unchanged last row
        out[12] = a[12];
        out[13] = a[13];
        out[14] = a[14];
        out[15] = a[15];
    }
    return out;
};

/**
 * Rotates a matrix by the given angle around the X axis not using SIMD
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */
mat4.scalar.rotateX = function (out, a, rad) {
    var s = Math.sin(rad),
        c = Math.cos(rad),
        a10 = a[4],
        a11 = a[5],
        a12 = a[6],
        a13 = a[7],
        a20 = a[8],
        a21 = a[9],
        a22 = a[10],
        a23 = a[11];

    if (a !== out) {
        // If the source and destination differ, copy the unchanged rows
        out[0] = a[0];
        out[1] = a[1];
        out[2] = a[2];
        out[3] = a[3];
        out[12] = a[12];
        out[13] = a[13];
        out[14] = a[14];
        out[15] = a[15];
    }

    // Perform axis-specific matrix multiplication
    out[4] = a10 * c + a20 * s;
    out[5] = a11 * c + a21 * s;
    out[6] = a12 * c + a22 * s;
    out[7] = a13 * c + a23 * s;
    out[8] = a20 * c - a10 * s;
    out[9] = a21 * c - a11 * s;
    out[10] = a22 * c - a12 * s;
    out[11] = a23 * c - a13 * s;
    return out;
};

/**
 * Rotates a matrix by the given angle around the X axis using SIMD
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */
mat4.SIMD.rotateX = function (out, a, rad) {
    var s = SIMD.Float32x4.splat(Math.sin(rad)),
        c = SIMD.Float32x4.splat(Math.cos(rad));

    if (a !== out) {
        // If the source and destination differ, copy the unchanged rows
        out[0] = a[0];
        out[1] = a[1];
        out[2] = a[2];
        out[3] = a[3];
        out[12] = a[12];
        out[13] = a[13];
        out[14] = a[14];
        out[15] = a[15];
    }

    // Perform axis-specific matrix multiplication
    var a_1 = SIMD.Float32x4.load(a, 4);
    var a_2 = SIMD.Float32x4.load(a, 8);
    SIMD.Float32x4.store(out, 4, SIMD.Float32x4.add(SIMD.Float32x4.mul(a_1, c), SIMD.Float32x4.mul(a_2, s)));
    SIMD.Float32x4.store(out, 8, SIMD.Float32x4.sub(SIMD.Float32x4.mul(a_2, c), SIMD.Float32x4.mul(a_1, s)));
    return out;
};

/**
 * Rotates a matrix by the given angle around the X axis using SIMD if availabe and enabled
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */
mat4.rotateX = glMatrix.USE_SIMD ? mat4.SIMD.rotateX : mat4.scalar.rotateX;

/**
 * Rotates a matrix by the given angle around the Y axis not using SIMD
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */
mat4.scalar.rotateY = function (out, a, rad) {
    var s = Math.sin(rad),
        c = Math.cos(rad),
        a00 = a[0],
        a01 = a[1],
        a02 = a[2],
        a03 = a[3],
        a20 = a[8],
        a21 = a[9],
        a22 = a[10],
        a23 = a[11];

    if (a !== out) {
        // If the source and destination differ, copy the unchanged rows
        out[4] = a[4];
        out[5] = a[5];
        out[6] = a[6];
        out[7] = a[7];
        out[12] = a[12];
        out[13] = a[13];
        out[14] = a[14];
        out[15] = a[15];
    }

    // Perform axis-specific matrix multiplication
    out[0] = a00 * c - a20 * s;
    out[1] = a01 * c - a21 * s;
    out[2] = a02 * c - a22 * s;
    out[3] = a03 * c - a23 * s;
    out[8] = a00 * s + a20 * c;
    out[9] = a01 * s + a21 * c;
    out[10] = a02 * s + a22 * c;
    out[11] = a03 * s + a23 * c;
    return out;
};

/**
 * Rotates a matrix by the given angle around the Y axis using SIMD
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */
mat4.SIMD.rotateY = function (out, a, rad) {
    var s = SIMD.Float32x4.splat(Math.sin(rad)),
        c = SIMD.Float32x4.splat(Math.cos(rad));

    if (a !== out) {
        // If the source and destination differ, copy the unchanged rows
        out[4] = a[4];
        out[5] = a[5];
        out[6] = a[6];
        out[7] = a[7];
        out[12] = a[12];
        out[13] = a[13];
        out[14] = a[14];
        out[15] = a[15];
    }

    // Perform axis-specific matrix multiplication
    var a_0 = SIMD.Float32x4.load(a, 0);
    var a_2 = SIMD.Float32x4.load(a, 8);
    SIMD.Float32x4.store(out, 0, SIMD.Float32x4.sub(SIMD.Float32x4.mul(a_0, c), SIMD.Float32x4.mul(a_2, s)));
    SIMD.Float32x4.store(out, 8, SIMD.Float32x4.add(SIMD.Float32x4.mul(a_0, s), SIMD.Float32x4.mul(a_2, c)));
    return out;
};

/**
 * Rotates a matrix by the given angle around the Y axis if SIMD available and enabled
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */
mat4.rotateY = glMatrix.USE_SIMD ? mat4.SIMD.rotateY : mat4.scalar.rotateY;

/**
 * Rotates a matrix by the given angle around the Z axis not using SIMD
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */
mat4.scalar.rotateZ = function (out, a, rad) {
    var s = Math.sin(rad),
        c = Math.cos(rad),
        a00 = a[0],
        a01 = a[1],
        a02 = a[2],
        a03 = a[3],
        a10 = a[4],
        a11 = a[5],
        a12 = a[6],
        a13 = a[7];

    if (a !== out) {
        // If the source and destination differ, copy the unchanged last row
        out[8] = a[8];
        out[9] = a[9];
        out[10] = a[10];
        out[11] = a[11];
        out[12] = a[12];
        out[13] = a[13];
        out[14] = a[14];
        out[15] = a[15];
    }

    // Perform axis-specific matrix multiplication
    out[0] = a00 * c + a10 * s;
    out[1] = a01 * c + a11 * s;
    out[2] = a02 * c + a12 * s;
    out[3] = a03 * c + a13 * s;
    out[4] = a10 * c - a00 * s;
    out[5] = a11 * c - a01 * s;
    out[6] = a12 * c - a02 * s;
    out[7] = a13 * c - a03 * s;
    return out;
};

/**
 * Rotates a matrix by the given angle around the Z axis using SIMD
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */
mat4.SIMD.rotateZ = function (out, a, rad) {
    var s = SIMD.Float32x4.splat(Math.sin(rad)),
        c = SIMD.Float32x4.splat(Math.cos(rad));

    if (a !== out) {
        // If the source and destination differ, copy the unchanged last row
        out[8] = a[8];
        out[9] = a[9];
        out[10] = a[10];
        out[11] = a[11];
        out[12] = a[12];
        out[13] = a[13];
        out[14] = a[14];
        out[15] = a[15];
    }

    // Perform axis-specific matrix multiplication
    var a_0 = SIMD.Float32x4.load(a, 0);
    var a_1 = SIMD.Float32x4.load(a, 4);
    SIMD.Float32x4.store(out, 0, SIMD.Float32x4.add(SIMD.Float32x4.mul(a_0, c), SIMD.Float32x4.mul(a_1, s)));
    SIMD.Float32x4.store(out, 4, SIMD.Float32x4.sub(SIMD.Float32x4.mul(a_1, c), SIMD.Float32x4.mul(a_0, s)));
    return out;
};

/**
 * Rotates a matrix by the given angle around the Z axis if SIMD available and enabled
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */
mat4.rotateZ = glMatrix.USE_SIMD ? mat4.SIMD.rotateZ : mat4.scalar.rotateZ;

/**
 * Creates a matrix from a vector translation
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.translate(dest, dest, vec);
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {vec3} v Translation vector
 * @returns {mat4} out
 */
mat4.fromTranslation = function (out, v) {
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = 1;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = 1;
    out[11] = 0;
    out[12] = v[0];
    out[13] = v[1];
    out[14] = v[2];
    out[15] = 1;
    return out;
};

/**
 * Creates a matrix from a vector scaling
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.scale(dest, dest, vec);
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {vec3} v Scaling vector
 * @returns {mat4} out
 */
mat4.fromScaling = function (out, v) {
    out[0] = v[0];
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = v[1];
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = v[2];
    out[11] = 0;
    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
    out[15] = 1;
    return out;
};

/**
 * Creates a matrix from a given angle around a given axis
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.rotate(dest, dest, rad, axis);
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {Number} rad the angle to rotate the matrix by
 * @param {vec3} axis the axis to rotate around
 * @returns {mat4} out
 */
mat4.fromRotation = function (out, rad, axis) {
    var x = axis[0],
        y = axis[1],
        z = axis[2],
        len = Math.sqrt(x * x + y * y + z * z),
        s,
        c,
        t;

    if (Math.abs(len) < glMatrix.EPSILON) {
        return null;
    }

    len = 1 / len;
    x *= len;
    y *= len;
    z *= len;

    s = Math.sin(rad);
    c = Math.cos(rad);
    t = 1 - c;

    // Perform rotation-specific matrix multiplication
    out[0] = x * x * t + c;
    out[1] = y * x * t + z * s;
    out[2] = z * x * t - y * s;
    out[3] = 0;
    out[4] = x * y * t - z * s;
    out[5] = y * y * t + c;
    out[6] = z * y * t + x * s;
    out[7] = 0;
    out[8] = x * z * t + y * s;
    out[9] = y * z * t - x * s;
    out[10] = z * z * t + c;
    out[11] = 0;
    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
    out[15] = 1;
    return out;
};

/**
 * Creates a matrix from the given angle around the X axis
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.rotateX(dest, dest, rad);
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */
mat4.fromXRotation = function (out, rad) {
    var s = Math.sin(rad),
        c = Math.cos(rad);

    // Perform axis-specific matrix multiplication
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = c;
    out[6] = s;
    out[7] = 0;
    out[8] = 0;
    out[9] = -s;
    out[10] = c;
    out[11] = 0;
    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
    out[15] = 1;
    return out;
};

/**
 * Creates a matrix from the given angle around the Y axis
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.rotateY(dest, dest, rad);
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */
mat4.fromYRotation = function (out, rad) {
    var s = Math.sin(rad),
        c = Math.cos(rad);

    // Perform axis-specific matrix multiplication
    out[0] = c;
    out[1] = 0;
    out[2] = -s;
    out[3] = 0;
    out[4] = 0;
    out[5] = 1;
    out[6] = 0;
    out[7] = 0;
    out[8] = s;
    out[9] = 0;
    out[10] = c;
    out[11] = 0;
    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
    out[15] = 1;
    return out;
};

/**
 * Creates a matrix from the given angle around the Z axis
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.rotateZ(dest, dest, rad);
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */
mat4.fromZRotation = function (out, rad) {
    var s = Math.sin(rad),
        c = Math.cos(rad);

    // Perform axis-specific matrix multiplication
    out[0] = c;
    out[1] = s;
    out[2] = 0;
    out[3] = 0;
    out[4] = -s;
    out[5] = c;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = 1;
    out[11] = 0;
    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
    out[15] = 1;
    return out;
};

/**
 * Creates a matrix from a quaternion rotation and vector translation
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.translate(dest, vec);
 *     var quatMat = mat4.create();
 *     quat4.toMat4(quat, quatMat);
 *     mat4.multiply(dest, quatMat);
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {quat4} q Rotation quaternion
 * @param {vec3} v Translation vector
 * @returns {mat4} out
 */
mat4.fromRotationTranslation = function (out, q, v) {
    // Quaternion math
    var x = q[0],
        y = q[1],
        z = q[2],
        w = q[3],
        x2 = x + x,
        y2 = y + y,
        z2 = z + z,
        xx = x * x2,
        xy = x * y2,
        xz = x * z2,
        yy = y * y2,
        yz = y * z2,
        zz = z * z2,
        wx = w * x2,
        wy = w * y2,
        wz = w * z2;

    out[0] = 1 - (yy + zz);
    out[1] = xy + wz;
    out[2] = xz - wy;
    out[3] = 0;
    out[4] = xy - wz;
    out[5] = 1 - (xx + zz);
    out[6] = yz + wx;
    out[7] = 0;
    out[8] = xz + wy;
    out[9] = yz - wx;
    out[10] = 1 - (xx + yy);
    out[11] = 0;
    out[12] = v[0];
    out[13] = v[1];
    out[14] = v[2];
    out[15] = 1;

    return out;
};

/**
 * Returns the translation vector component of a transformation
 *  matrix. If a matrix is built with fromRotationTranslation,
 *  the returned vector will be the same as the translation vector
 *  originally supplied.
 * @param  {vec3} out Vector to receive translation component
 * @param  {mat4} mat Matrix to be decomposed (input)
 * @return {vec3} out
 */
mat4.getTranslation = function (out, mat) {
    out[0] = mat[12];
    out[1] = mat[13];
    out[2] = mat[14];

    return out;
};

/**
 * Returns a quaternion representing the rotational component
 *  of a transformation matrix. If a matrix is built with
 *  fromRotationTranslation, the returned quaternion will be the
 *  same as the quaternion originally supplied.
 * @param {quat} out Quaternion to receive the rotation component
 * @param {mat4} mat Matrix to be decomposed (input)
 * @return {quat} out
 */
mat4.getRotation = function (out, mat) {
    // Algorithm taken from http://www.euclideanspace.com/maths/geometry/rotations/conversions/matrixToQuaternion/index.htm
    var trace = mat[0] + mat[5] + mat[10];
    var S = 0;

    if (trace > 0) {
        S = Math.sqrt(trace + 1.0) * 2;
        out[3] = 0.25 * S;
        out[0] = (mat[6] - mat[9]) / S;
        out[1] = (mat[8] - mat[2]) / S;
        out[2] = (mat[1] - mat[4]) / S;
    } else if (mat[0] > mat[5] & mat[0] > mat[10]) {
        S = Math.sqrt(1.0 + mat[0] - mat[5] - mat[10]) * 2;
        out[3] = (mat[6] - mat[9]) / S;
        out[0] = 0.25 * S;
        out[1] = (mat[1] + mat[4]) / S;
        out[2] = (mat[8] + mat[2]) / S;
    } else if (mat[5] > mat[10]) {
        S = Math.sqrt(1.0 + mat[5] - mat[0] - mat[10]) * 2;
        out[3] = (mat[8] - mat[2]) / S;
        out[0] = (mat[1] + mat[4]) / S;
        out[1] = 0.25 * S;
        out[2] = (mat[6] + mat[9]) / S;
    } else {
        S = Math.sqrt(1.0 + mat[10] - mat[0] - mat[5]) * 2;
        out[3] = (mat[1] - mat[4]) / S;
        out[0] = (mat[8] + mat[2]) / S;
        out[1] = (mat[6] + mat[9]) / S;
        out[2] = 0.25 * S;
    }

    return out;
};

/**
 * Creates a matrix from a quaternion rotation, vector translation and vector scale
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.translate(dest, vec);
 *     var quatMat = mat4.create();
 *     quat4.toMat4(quat, quatMat);
 *     mat4.multiply(dest, quatMat);
 *     mat4.scale(dest, scale)
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {quat4} q Rotation quaternion
 * @param {vec3} v Translation vector
 * @param {vec3} s Scaling vector
 * @returns {mat4} out
 */
mat4.fromRotationTranslationScale = function (out, q, v, s) {
    // Quaternion math
    var x = q[0],
        y = q[1],
        z = q[2],
        w = q[3],
        x2 = x + x,
        y2 = y + y,
        z2 = z + z,
        xx = x * x2,
        xy = x * y2,
        xz = x * z2,
        yy = y * y2,
        yz = y * z2,
        zz = z * z2,
        wx = w * x2,
        wy = w * y2,
        wz = w * z2,
        sx = s[0],
        sy = s[1],
        sz = s[2];

    out[0] = (1 - (yy + zz)) * sx;
    out[1] = (xy + wz) * sx;
    out[2] = (xz - wy) * sx;
    out[3] = 0;
    out[4] = (xy - wz) * sy;
    out[5] = (1 - (xx + zz)) * sy;
    out[6] = (yz + wx) * sy;
    out[7] = 0;
    out[8] = (xz + wy) * sz;
    out[9] = (yz - wx) * sz;
    out[10] = (1 - (xx + yy)) * sz;
    out[11] = 0;
    out[12] = v[0];
    out[13] = v[1];
    out[14] = v[2];
    out[15] = 1;

    return out;
};

/**
 * Creates a matrix from a quaternion rotation, vector translation and vector scale, rotating and scaling around the given origin
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.translate(dest, vec);
 *     mat4.translate(dest, origin);
 *     var quatMat = mat4.create();
 *     quat4.toMat4(quat, quatMat);
 *     mat4.multiply(dest, quatMat);
 *     mat4.scale(dest, scale)
 *     mat4.translate(dest, negativeOrigin);
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {quat4} q Rotation quaternion
 * @param {vec3} v Translation vector
 * @param {vec3} s Scaling vector
 * @param {vec3} o The origin vector around which to scale and rotate
 * @returns {mat4} out
 */
mat4.fromRotationTranslationScaleOrigin = function (out, q, v, s, o) {
    // Quaternion math
    var x = q[0],
        y = q[1],
        z = q[2],
        w = q[3],
        x2 = x + x,
        y2 = y + y,
        z2 = z + z,
        xx = x * x2,
        xy = x * y2,
        xz = x * z2,
        yy = y * y2,
        yz = y * z2,
        zz = z * z2,
        wx = w * x2,
        wy = w * y2,
        wz = w * z2,
        sx = s[0],
        sy = s[1],
        sz = s[2],
        ox = o[0],
        oy = o[1],
        oz = o[2];

    out[0] = (1 - (yy + zz)) * sx;
    out[1] = (xy + wz) * sx;
    out[2] = (xz - wy) * sx;
    out[3] = 0;
    out[4] = (xy - wz) * sy;
    out[5] = (1 - (xx + zz)) * sy;
    out[6] = (yz + wx) * sy;
    out[7] = 0;
    out[8] = (xz + wy) * sz;
    out[9] = (yz - wx) * sz;
    out[10] = (1 - (xx + yy)) * sz;
    out[11] = 0;
    out[12] = v[0] + ox - (out[0] * ox + out[4] * oy + out[8] * oz);
    out[13] = v[1] + oy - (out[1] * ox + out[5] * oy + out[9] * oz);
    out[14] = v[2] + oz - (out[2] * ox + out[6] * oy + out[10] * oz);
    out[15] = 1;

    return out;
};

/**
 * Calculates a 4x4 matrix from the given quaternion
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {quat} q Quaternion to create matrix from
 *
 * @returns {mat4} out
 */
mat4.fromQuat = function (out, q) {
    var x = q[0],
        y = q[1],
        z = q[2],
        w = q[3],
        x2 = x + x,
        y2 = y + y,
        z2 = z + z,
        xx = x * x2,
        yx = y * x2,
        yy = y * y2,
        zx = z * x2,
        zy = z * y2,
        zz = z * z2,
        wx = w * x2,
        wy = w * y2,
        wz = w * z2;

    out[0] = 1 - yy - zz;
    out[1] = yx + wz;
    out[2] = zx - wy;
    out[3] = 0;

    out[4] = yx - wz;
    out[5] = 1 - xx - zz;
    out[6] = zy + wx;
    out[7] = 0;

    out[8] = zx + wy;
    out[9] = zy - wx;
    out[10] = 1 - xx - yy;
    out[11] = 0;

    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
    out[15] = 1;

    return out;
};

/**
 * Generates a frustum matrix with the given bounds
 *
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {Number} left Left bound of the frustum
 * @param {Number} right Right bound of the frustum
 * @param {Number} bottom Bottom bound of the frustum
 * @param {Number} top Top bound of the frustum
 * @param {Number} near Near bound of the frustum
 * @param {Number} far Far bound of the frustum
 * @returns {mat4} out
 */
mat4.frustum = function (out, left, right, bottom, top, near, far) {
    var rl = 1 / (right - left),
        tb = 1 / (top - bottom),
        nf = 1 / (near - far);
    out[0] = near * 2 * rl;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = near * 2 * tb;
    out[6] = 0;
    out[7] = 0;
    out[8] = (right + left) * rl;
    out[9] = (top + bottom) * tb;
    out[10] = (far + near) * nf;
    out[11] = -1;
    out[12] = 0;
    out[13] = 0;
    out[14] = far * near * 2 * nf;
    out[15] = 0;
    return out;
};

/**
 * Generates a perspective projection matrix with the given bounds
 *
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {number} fovy Vertical field of view in radians
 * @param {number} aspect Aspect ratio. typically viewport width/height
 * @param {number} near Near bound of the frustum
 * @param {number} far Far bound of the frustum
 * @returns {mat4} out
 */
mat4.perspective = function (out, fovy, aspect, near, far) {
    var f = 1.0 / Math.tan(fovy / 2),
        nf = 1 / (near - far);
    out[0] = f / aspect;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = f;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = (far + near) * nf;
    out[11] = -1;
    out[12] = 0;
    out[13] = 0;
    out[14] = 2 * far * near * nf;
    out[15] = 0;
    return out;
};

/**
 * Generates a perspective projection matrix with the given field of view.
 * This is primarily useful for generating projection matrices to be used
 * with the still experiemental WebVR API.
 *
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {Object} fov Object containing the following values: upDegrees, downDegrees, leftDegrees, rightDegrees
 * @param {number} near Near bound of the frustum
 * @param {number} far Far bound of the frustum
 * @returns {mat4} out
 */
mat4.perspectiveFromFieldOfView = function (out, fov, near, far) {
    var upTan = Math.tan(fov.upDegrees * Math.PI / 180.0),
        downTan = Math.tan(fov.downDegrees * Math.PI / 180.0),
        leftTan = Math.tan(fov.leftDegrees * Math.PI / 180.0),
        rightTan = Math.tan(fov.rightDegrees * Math.PI / 180.0),
        xScale = 2.0 / (leftTan + rightTan),
        yScale = 2.0 / (upTan + downTan);

    out[0] = xScale;
    out[1] = 0.0;
    out[2] = 0.0;
    out[3] = 0.0;
    out[4] = 0.0;
    out[5] = yScale;
    out[6] = 0.0;
    out[7] = 0.0;
    out[8] = -((leftTan - rightTan) * xScale * 0.5);
    out[9] = (upTan - downTan) * yScale * 0.5;
    out[10] = far / (near - far);
    out[11] = -1.0;
    out[12] = 0.0;
    out[13] = 0.0;
    out[14] = far * near / (near - far);
    out[15] = 0.0;
    return out;
};

/**
 * Generates a orthogonal projection matrix with the given bounds
 *
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {number} left Left bound of the frustum
 * @param {number} right Right bound of the frustum
 * @param {number} bottom Bottom bound of the frustum
 * @param {number} top Top bound of the frustum
 * @param {number} near Near bound of the frustum
 * @param {number} far Far bound of the frustum
 * @returns {mat4} out
 */
mat4.ortho = function (out, left, right, bottom, top, near, far) {
    var lr = 1 / (left - right),
        bt = 1 / (bottom - top),
        nf = 1 / (near - far);
    out[0] = -2 * lr;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = -2 * bt;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = 2 * nf;
    out[11] = 0;
    out[12] = (left + right) * lr;
    out[13] = (top + bottom) * bt;
    out[14] = (far + near) * nf;
    out[15] = 1;
    return out;
};

/**
 * Generates a look-at matrix with the given eye position, focal point, and up axis
 *
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {vec3} eye Position of the viewer
 * @param {vec3} center Point the viewer is looking at
 * @param {vec3} up vec3 pointing up
 * @returns {mat4} out
 */
mat4.lookAt = function (out, eye, center, up) {
    var x0,
        x1,
        x2,
        y0,
        y1,
        y2,
        z0,
        z1,
        z2,
        len,
        eyex = eye[0],
        eyey = eye[1],
        eyez = eye[2],
        upx = up[0],
        upy = up[1],
        upz = up[2],
        centerx = center[0],
        centery = center[1],
        centerz = center[2];

    if (Math.abs(eyex - centerx) < glMatrix.EPSILON && Math.abs(eyey - centery) < glMatrix.EPSILON && Math.abs(eyez - centerz) < glMatrix.EPSILON) {
        return mat4.identity(out);
    }

    z0 = eyex - centerx;
    z1 = eyey - centery;
    z2 = eyez - centerz;

    len = 1 / Math.sqrt(z0 * z0 + z1 * z1 + z2 * z2);
    z0 *= len;
    z1 *= len;
    z2 *= len;

    x0 = upy * z2 - upz * z1;
    x1 = upz * z0 - upx * z2;
    x2 = upx * z1 - upy * z0;
    len = Math.sqrt(x0 * x0 + x1 * x1 + x2 * x2);
    if (!len) {
        x0 = 0;
        x1 = 0;
        x2 = 0;
    } else {
        len = 1 / len;
        x0 *= len;
        x1 *= len;
        x2 *= len;
    }

    y0 = z1 * x2 - z2 * x1;
    y1 = z2 * x0 - z0 * x2;
    y2 = z0 * x1 - z1 * x0;

    len = Math.sqrt(y0 * y0 + y1 * y1 + y2 * y2);
    if (!len) {
        y0 = 0;
        y1 = 0;
        y2 = 0;
    } else {
        len = 1 / len;
        y0 *= len;
        y1 *= len;
        y2 *= len;
    }

    out[0] = x0;
    out[1] = y0;
    out[2] = z0;
    out[3] = 0;
    out[4] = x1;
    out[5] = y1;
    out[6] = z1;
    out[7] = 0;
    out[8] = x2;
    out[9] = y2;
    out[10] = z2;
    out[11] = 0;
    out[12] = -(x0 * eyex + x1 * eyey + x2 * eyez);
    out[13] = -(y0 * eyex + y1 * eyey + y2 * eyez);
    out[14] = -(z0 * eyex + z1 * eyey + z2 * eyez);
    out[15] = 1;

    return out;
};

/**
 * Returns a string representation of a mat4
 *
 * @param {mat4} a matrix to represent as a string
 * @returns {String} string representation of the matrix
 */
mat4.str = function (a) {
    return 'mat4(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' + a[3] + ', ' + a[4] + ', ' + a[5] + ', ' + a[6] + ', ' + a[7] + ', ' + a[8] + ', ' + a[9] + ', ' + a[10] + ', ' + a[11] + ', ' + a[12] + ', ' + a[13] + ', ' + a[14] + ', ' + a[15] + ')';
};

/**
 * Returns Frobenius norm of a mat4
 *
 * @param {mat4} a the matrix to calculate Frobenius norm of
 * @returns {Number} Frobenius norm
 */
mat4.frob = function (a) {
    return Math.sqrt(Math.pow(a[0], 2) + Math.pow(a[1], 2) + Math.pow(a[2], 2) + Math.pow(a[3], 2) + Math.pow(a[4], 2) + Math.pow(a[5], 2) + Math.pow(a[6], 2) + Math.pow(a[7], 2) + Math.pow(a[8], 2) + Math.pow(a[9], 2) + Math.pow(a[10], 2) + Math.pow(a[11], 2) + Math.pow(a[12], 2) + Math.pow(a[13], 2) + Math.pow(a[14], 2) + Math.pow(a[15], 2));
};

/**
 * Adds two mat4's
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the first operand
 * @param {mat4} b the second operand
 * @returns {mat4} out
 */
mat4.add = function (out, a, b) {
    out[0] = a[0] + b[0];
    out[1] = a[1] + b[1];
    out[2] = a[2] + b[2];
    out[3] = a[3] + b[3];
    out[4] = a[4] + b[4];
    out[5] = a[5] + b[5];
    out[6] = a[6] + b[6];
    out[7] = a[7] + b[7];
    out[8] = a[8] + b[8];
    out[9] = a[9] + b[9];
    out[10] = a[10] + b[10];
    out[11] = a[11] + b[11];
    out[12] = a[12] + b[12];
    out[13] = a[13] + b[13];
    out[14] = a[14] + b[14];
    out[15] = a[15] + b[15];
    return out;
};

/**
 * Subtracts matrix b from matrix a
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the first operand
 * @param {mat4} b the second operand
 * @returns {mat4} out
 */
mat4.subtract = function (out, a, b) {
    out[0] = a[0] - b[0];
    out[1] = a[1] - b[1];
    out[2] = a[2] - b[2];
    out[3] = a[3] - b[3];
    out[4] = a[4] - b[4];
    out[5] = a[5] - b[5];
    out[6] = a[6] - b[6];
    out[7] = a[7] - b[7];
    out[8] = a[8] - b[8];
    out[9] = a[9] - b[9];
    out[10] = a[10] - b[10];
    out[11] = a[11] - b[11];
    out[12] = a[12] - b[12];
    out[13] = a[13] - b[13];
    out[14] = a[14] - b[14];
    out[15] = a[15] - b[15];
    return out;
};

/**
 * Alias for {@link mat4.subtract}
 * @function
 */
mat4.sub = mat4.subtract;

/**
 * Multiply each element of the matrix by a scalar.
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to scale
 * @param {Number} b amount to scale the matrix's elements by
 * @returns {mat4} out
 */
mat4.multiplyScalar = function (out, a, b) {
    out[0] = a[0] * b;
    out[1] = a[1] * b;
    out[2] = a[2] * b;
    out[3] = a[3] * b;
    out[4] = a[4] * b;
    out[5] = a[5] * b;
    out[6] = a[6] * b;
    out[7] = a[7] * b;
    out[8] = a[8] * b;
    out[9] = a[9] * b;
    out[10] = a[10] * b;
    out[11] = a[11] * b;
    out[12] = a[12] * b;
    out[13] = a[13] * b;
    out[14] = a[14] * b;
    out[15] = a[15] * b;
    return out;
};

/**
 * Adds two mat4's after multiplying each element of the second operand by a scalar value.
 *
 * @param {mat4} out the receiving vector
 * @param {mat4} a the first operand
 * @param {mat4} b the second operand
 * @param {Number} scale the amount to scale b's elements by before adding
 * @returns {mat4} out
 */
mat4.multiplyScalarAndAdd = function (out, a, b, scale) {
    out[0] = a[0] + b[0] * scale;
    out[1] = a[1] + b[1] * scale;
    out[2] = a[2] + b[2] * scale;
    out[3] = a[3] + b[3] * scale;
    out[4] = a[4] + b[4] * scale;
    out[5] = a[5] + b[5] * scale;
    out[6] = a[6] + b[6] * scale;
    out[7] = a[7] + b[7] * scale;
    out[8] = a[8] + b[8] * scale;
    out[9] = a[9] + b[9] * scale;
    out[10] = a[10] + b[10] * scale;
    out[11] = a[11] + b[11] * scale;
    out[12] = a[12] + b[12] * scale;
    out[13] = a[13] + b[13] * scale;
    out[14] = a[14] + b[14] * scale;
    out[15] = a[15] + b[15] * scale;
    return out;
};

/**
 * Returns whether or not the matrices have exactly the same elements in the same position (when compared with ===)
 *
 * @param {mat4} a The first matrix.
 * @param {mat4} b The second matrix.
 * @returns {Boolean} True if the matrices are equal, false otherwise.
 */
mat4.exactEquals = function (a, b) {
    return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3] && a[4] === b[4] && a[5] === b[5] && a[6] === b[6] && a[7] === b[7] && a[8] === b[8] && a[9] === b[9] && a[10] === b[10] && a[11] === b[11] && a[12] === b[12] && a[13] === b[13] && a[14] === b[14] && a[15] === b[15];
};

/**
 * Returns whether or not the matrices have approximately the same elements in the same position.
 *
 * @param {mat4} a The first matrix.
 * @param {mat4} b The second matrix.
 * @returns {Boolean} True if the matrices are equal, false otherwise.
 */
mat4.equals = function (a, b) {
    var a0 = a[0],
        a1 = a[1],
        a2 = a[2],
        a3 = a[3],
        a4 = a[4],
        a5 = a[5],
        a6 = a[6],
        a7 = a[7],
        a8 = a[8],
        a9 = a[9],
        a10 = a[10],
        a11 = a[11],
        a12 = a[12],
        a13 = a[13],
        a14 = a[14],
        a15 = a[15];

    var b0 = b[0],
        b1 = b[1],
        b2 = b[2],
        b3 = b[3],
        b4 = b[4],
        b5 = b[5],
        b6 = b[6],
        b7 = b[7],
        b8 = b[8],
        b9 = b[9],
        b10 = b[10],
        b11 = b[11],
        b12 = b[12],
        b13 = b[13],
        b14 = b[14],
        b15 = b[15];

    return Math.abs(a0 - b0) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a0), Math.abs(b0)) && Math.abs(a1 - b1) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a1), Math.abs(b1)) && Math.abs(a2 - b2) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a2), Math.abs(b2)) && Math.abs(a3 - b3) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a3), Math.abs(b3)) && Math.abs(a4 - b4) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a4), Math.abs(b4)) && Math.abs(a5 - b5) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a5), Math.abs(b5)) && Math.abs(a6 - b6) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a6), Math.abs(b6)) && Math.abs(a7 - b7) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a7), Math.abs(b7)) && Math.abs(a8 - b8) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a8), Math.abs(b8)) && Math.abs(a9 - b9) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a9), Math.abs(b9)) && Math.abs(a10 - b10) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a10), Math.abs(b10)) && Math.abs(a11 - b11) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a11), Math.abs(b11)) && Math.abs(a12 - b12) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a12), Math.abs(b12)) && Math.abs(a13 - b13) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a13), Math.abs(b13)) && Math.abs(a14 - b14) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a14), Math.abs(b14)) && Math.abs(a15 - b15) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a15), Math.abs(b15));
};

/* Copyright (c) 2015, Brandon Jones, Colin MacKenzie IV.
 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:
 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.
 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE. */

/**
 * @class 3 Dimensional Vector
 * @name vec3
 */
var vec3 = {};

/**
 * Creates a new, empty vec3
 *
 * @returns {vec3} a new 3D vector
 */
vec3.create = function () {
    var out = new glMatrix.ARRAY_TYPE(3);
    out[0] = 0;
    out[1] = 0;
    out[2] = 0;
    return out;
};

/**
 * Creates a new vec3 initialized with values from an existing vector
 *
 * @param {vec3} a vector to clone
 * @returns {vec3} a new 3D vector
 */
vec3.clone = function (a) {
    var out = new glMatrix.ARRAY_TYPE(3);
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    return out;
};

/**
 * Creates a new vec3 initialized with the given values
 *
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @returns {vec3} a new 3D vector
 */
vec3.fromValues = function (x, y, z) {
    var out = new glMatrix.ARRAY_TYPE(3);
    out[0] = x;
    out[1] = y;
    out[2] = z;
    return out;
};

/**
 * Copy the values from one vec3 to another
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the source vector
 * @returns {vec3} out
 */
vec3.copy = function (out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    return out;
};

/**
 * Set the components of a vec3 to the given values
 *
 * @param {vec3} out the receiving vector
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @returns {vec3} out
 */
vec3.set = function (out, x, y, z) {
    out[0] = x;
    out[1] = y;
    out[2] = z;
    return out;
};

/**
 * Adds two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */
vec3.add = function (out, a, b) {
    out[0] = a[0] + b[0];
    out[1] = a[1] + b[1];
    out[2] = a[2] + b[2];
    return out;
};

/**
 * Subtracts vector b from vector a
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */
vec3.subtract = function (out, a, b) {
    out[0] = a[0] - b[0];
    out[1] = a[1] - b[1];
    out[2] = a[2] - b[2];
    return out;
};

/**
 * Alias for {@link vec3.subtract}
 * @function
 */
vec3.sub = vec3.subtract;

/**
 * Multiplies two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */
vec3.multiply = function (out, a, b) {
    out[0] = a[0] * b[0];
    out[1] = a[1] * b[1];
    out[2] = a[2] * b[2];
    return out;
};

/**
 * Alias for {@link vec3.multiply}
 * @function
 */
vec3.mul = vec3.multiply;

/**
 * Divides two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */
vec3.divide = function (out, a, b) {
    out[0] = a[0] / b[0];
    out[1] = a[1] / b[1];
    out[2] = a[2] / b[2];
    return out;
};

/**
 * Alias for {@link vec3.divide}
 * @function
 */
vec3.div = vec3.divide;

/**
 * Math.ceil the components of a vec3
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a vector to ceil
 * @returns {vec3} out
 */
vec3.ceil = function (out, a) {
    out[0] = Math.ceil(a[0]);
    out[1] = Math.ceil(a[1]);
    out[2] = Math.ceil(a[2]);
    return out;
};

/**
 * Math.floor the components of a vec3
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a vector to floor
 * @returns {vec3} out
 */
vec3.floor = function (out, a) {
    out[0] = Math.floor(a[0]);
    out[1] = Math.floor(a[1]);
    out[2] = Math.floor(a[2]);
    return out;
};

/**
 * Returns the minimum of two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */
vec3.min = function (out, a, b) {
    out[0] = Math.min(a[0], b[0]);
    out[1] = Math.min(a[1], b[1]);
    out[2] = Math.min(a[2], b[2]);
    return out;
};

/**
 * Returns the maximum of two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */
vec3.max = function (out, a, b) {
    out[0] = Math.max(a[0], b[0]);
    out[1] = Math.max(a[1], b[1]);
    out[2] = Math.max(a[2], b[2]);
    return out;
};

/**
 * Math.round the components of a vec3
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a vector to round
 * @returns {vec3} out
 */
vec3.round = function (out, a) {
    out[0] = Math.round(a[0]);
    out[1] = Math.round(a[1]);
    out[2] = Math.round(a[2]);
    return out;
};

/**
 * Scales a vec3 by a scalar number
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the vector to scale
 * @param {Number} b amount to scale the vector by
 * @returns {vec3} out
 */
vec3.scale = function (out, a, b) {
    out[0] = a[0] * b;
    out[1] = a[1] * b;
    out[2] = a[2] * b;
    return out;
};

/**
 * Adds two vec3's after scaling the second operand by a scalar value
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @param {Number} scale the amount to scale b by before adding
 * @returns {vec3} out
 */
vec3.scaleAndAdd = function (out, a, b, scale) {
    out[0] = a[0] + b[0] * scale;
    out[1] = a[1] + b[1] * scale;
    out[2] = a[2] + b[2] * scale;
    return out;
};

/**
 * Calculates the euclidian distance between two vec3's
 *
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {Number} distance between a and b
 */
vec3.distance = function (a, b) {
    var x = b[0] - a[0],
        y = b[1] - a[1],
        z = b[2] - a[2];
    return Math.sqrt(x * x + y * y + z * z);
};

/**
 * Alias for {@link vec3.distance}
 * @function
 */
vec3.dist = vec3.distance;

/**
 * Calculates the squared euclidian distance between two vec3's
 *
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {Number} squared distance between a and b
 */
vec3.squaredDistance = function (a, b) {
    var x = b[0] - a[0],
        y = b[1] - a[1],
        z = b[2] - a[2];
    return x * x + y * y + z * z;
};

/**
 * Alias for {@link vec3.squaredDistance}
 * @function
 */
vec3.sqrDist = vec3.squaredDistance;

/**
 * Calculates the length of a vec3
 *
 * @param {vec3} a vector to calculate length of
 * @returns {Number} length of a
 */
vec3.length = function (a) {
    var x = a[0],
        y = a[1],
        z = a[2];
    return Math.sqrt(x * x + y * y + z * z);
};

/**
 * Alias for {@link vec3.length}
 * @function
 */
vec3.len = vec3.length;

/**
 * Calculates the squared length of a vec3
 *
 * @param {vec3} a vector to calculate squared length of
 * @returns {Number} squared length of a
 */
vec3.squaredLength = function (a) {
    var x = a[0],
        y = a[1],
        z = a[2];
    return x * x + y * y + z * z;
};

/**
 * Alias for {@link vec3.squaredLength}
 * @function
 */
vec3.sqrLen = vec3.squaredLength;

/**
 * Negates the components of a vec3
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a vector to negate
 * @returns {vec3} out
 */
vec3.negate = function (out, a) {
    out[0] = -a[0];
    out[1] = -a[1];
    out[2] = -a[2];
    return out;
};

/**
 * Returns the inverse of the components of a vec3
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a vector to invert
 * @returns {vec3} out
 */
vec3.inverse = function (out, a) {
    out[0] = 1.0 / a[0];
    out[1] = 1.0 / a[1];
    out[2] = 1.0 / a[2];
    return out;
};

/**
 * Normalize a vec3
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a vector to normalize
 * @returns {vec3} out
 */
vec3.normalize = function (out, a) {
    var x = a[0],
        y = a[1],
        z = a[2];
    var len = x * x + y * y + z * z;
    if (len > 0) {
        //TODO: evaluate use of glm_invsqrt here?
        len = 1 / Math.sqrt(len);
        out[0] = a[0] * len;
        out[1] = a[1] * len;
        out[2] = a[2] * len;
    }
    return out;
};

/**
 * Calculates the dot product of two vec3's
 *
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {Number} dot product of a and b
 */
vec3.dot = function (a, b) {
    return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
};

/**
 * Computes the cross product of two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */
vec3.cross = function (out, a, b) {
    var ax = a[0],
        ay = a[1],
        az = a[2],
        bx = b[0],
        by = b[1],
        bz = b[2];

    out[0] = ay * bz - az * by;
    out[1] = az * bx - ax * bz;
    out[2] = ax * by - ay * bx;
    return out;
};

/**
 * Performs a linear interpolation between two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @param {Number} t interpolation amount between the two inputs
 * @returns {vec3} out
 */
vec3.lerp = function (out, a, b, t) {
    var ax = a[0],
        ay = a[1],
        az = a[2];
    out[0] = ax + t * (b[0] - ax);
    out[1] = ay + t * (b[1] - ay);
    out[2] = az + t * (b[2] - az);
    return out;
};

/**
 * Performs a hermite interpolation with two control points
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @param {vec3} c the third operand
 * @param {vec3} d the fourth operand
 * @param {Number} t interpolation amount between the two inputs
 * @returns {vec3} out
 */
vec3.hermite = function (out, a, b, c, d, t) {
    var factorTimes2 = t * t,
        factor1 = factorTimes2 * (2 * t - 3) + 1,
        factor2 = factorTimes2 * (t - 2) + t,
        factor3 = factorTimes2 * (t - 1),
        factor4 = factorTimes2 * (3 - 2 * t);

    out[0] = a[0] * factor1 + b[0] * factor2 + c[0] * factor3 + d[0] * factor4;
    out[1] = a[1] * factor1 + b[1] * factor2 + c[1] * factor3 + d[1] * factor4;
    out[2] = a[2] * factor1 + b[2] * factor2 + c[2] * factor3 + d[2] * factor4;

    return out;
};

/**
 * Performs a bezier interpolation with two control points
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @param {vec3} c the third operand
 * @param {vec3} d the fourth operand
 * @param {Number} t interpolation amount between the two inputs
 * @returns {vec3} out
 */
vec3.bezier = function (out, a, b, c, d, t) {
    var inverseFactor = 1 - t,
        inverseFactorTimesTwo = inverseFactor * inverseFactor,
        factorTimes2 = t * t,
        factor1 = inverseFactorTimesTwo * inverseFactor,
        factor2 = 3 * t * inverseFactorTimesTwo,
        factor3 = 3 * factorTimes2 * inverseFactor,
        factor4 = factorTimes2 * t;

    out[0] = a[0] * factor1 + b[0] * factor2 + c[0] * factor3 + d[0] * factor4;
    out[1] = a[1] * factor1 + b[1] * factor2 + c[1] * factor3 + d[1] * factor4;
    out[2] = a[2] * factor1 + b[2] * factor2 + c[2] * factor3 + d[2] * factor4;

    return out;
};

/**
 * Generates a random vector with the given scale
 *
 * @param {vec3} out the receiving vector
 * @param {Number} [scale] Length of the resulting vector. If ommitted, a unit vector will be returned
 * @returns {vec3} out
 */
vec3.random = function (out, scale) {
    scale = scale || 1.0;

    var r = glMatrix.RANDOM() * 2.0 * Math.PI;
    var z = glMatrix.RANDOM() * 2.0 - 1.0;
    var zScale = Math.sqrt(1.0 - z * z) * scale;

    out[0] = Math.cos(r) * zScale;
    out[1] = Math.sin(r) * zScale;
    out[2] = z * scale;
    return out;
};

/**
 * Transforms the vec3 with a mat4.
 * 4th vector component is implicitly '1'
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the vector to transform
 * @param {mat4} m matrix to transform with
 * @returns {vec3} out
 */
vec3.transformMat4 = function (out, a, m) {
    var x = a[0],
        y = a[1],
        z = a[2],
        w = m[3] * x + m[7] * y + m[11] * z + m[15];
    w = w || 1.0;
    out[0] = (m[0] * x + m[4] * y + m[8] * z + m[12]) / w;
    out[1] = (m[1] * x + m[5] * y + m[9] * z + m[13]) / w;
    out[2] = (m[2] * x + m[6] * y + m[10] * z + m[14]) / w;
    return out;
};

/**
 * Transforms the vec3 with a mat3.
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the vector to transform
 * @param {mat4} m the 3x3 matrix to transform with
 * @returns {vec3} out
 */
vec3.transformMat3 = function (out, a, m) {
    var x = a[0],
        y = a[1],
        z = a[2];
    out[0] = x * m[0] + y * m[3] + z * m[6];
    out[1] = x * m[1] + y * m[4] + z * m[7];
    out[2] = x * m[2] + y * m[5] + z * m[8];
    return out;
};

/**
 * Transforms the vec3 with a quat
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the vector to transform
 * @param {quat} q quaternion to transform with
 * @returns {vec3} out
 */
vec3.transformQuat = function (out, a, q) {
    // benchmarks: http://jsperf.com/quaternion-transform-vec3-implementations

    var x = a[0],
        y = a[1],
        z = a[2],
        qx = q[0],
        qy = q[1],
        qz = q[2],
        qw = q[3],


    // calculate quat * vec
    ix = qw * x + qy * z - qz * y,
        iy = qw * y + qz * x - qx * z,
        iz = qw * z + qx * y - qy * x,
        iw = -qx * x - qy * y - qz * z;

    // calculate result * inverse quat
    out[0] = ix * qw + iw * -qx + iy * -qz - iz * -qy;
    out[1] = iy * qw + iw * -qy + iz * -qx - ix * -qz;
    out[2] = iz * qw + iw * -qz + ix * -qy - iy * -qx;
    return out;
};

/**
 * Rotate a 3D vector around the x-axis
 * @param {vec3} out The receiving vec3
 * @param {vec3} a The vec3 point to rotate
 * @param {vec3} b The origin of the rotation
 * @param {Number} c The angle of rotation
 * @returns {vec3} out
 */
vec3.rotateX = function (out, a, b, c) {
    var p = [],
        r = [];
    //Translate point to the origin
    p[0] = a[0] - b[0];
    p[1] = a[1] - b[1];
    p[2] = a[2] - b[2];

    //perform rotation
    r[0] = p[0];
    r[1] = p[1] * Math.cos(c) - p[2] * Math.sin(c);
    r[2] = p[1] * Math.sin(c) + p[2] * Math.cos(c);

    //translate to correct position
    out[0] = r[0] + b[0];
    out[1] = r[1] + b[1];
    out[2] = r[2] + b[2];

    return out;
};

/**
 * Rotate a 3D vector around the y-axis
 * @param {vec3} out The receiving vec3
 * @param {vec3} a The vec3 point to rotate
 * @param {vec3} b The origin of the rotation
 * @param {Number} c The angle of rotation
 * @returns {vec3} out
 */
vec3.rotateY = function (out, a, b, c) {
    var p = [],
        r = [];
    //Translate point to the origin
    p[0] = a[0] - b[0];
    p[1] = a[1] - b[1];
    p[2] = a[2] - b[2];

    //perform rotation
    r[0] = p[2] * Math.sin(c) + p[0] * Math.cos(c);
    r[1] = p[1];
    r[2] = p[2] * Math.cos(c) - p[0] * Math.sin(c);

    //translate to correct position
    out[0] = r[0] + b[0];
    out[1] = r[1] + b[1];
    out[2] = r[2] + b[2];

    return out;
};

/**
 * Rotate a 3D vector around the z-axis
 * @param {vec3} out The receiving vec3
 * @param {vec3} a The vec3 point to rotate
 * @param {vec3} b The origin of the rotation
 * @param {Number} c The angle of rotation
 * @returns {vec3} out
 */
vec3.rotateZ = function (out, a, b, c) {
    var p = [],
        r = [];
    //Translate point to the origin
    p[0] = a[0] - b[0];
    p[1] = a[1] - b[1];
    p[2] = a[2] - b[2];

    //perform rotation
    r[0] = p[0] * Math.cos(c) - p[1] * Math.sin(c);
    r[1] = p[0] * Math.sin(c) + p[1] * Math.cos(c);
    r[2] = p[2];

    //translate to correct position
    out[0] = r[0] + b[0];
    out[1] = r[1] + b[1];
    out[2] = r[2] + b[2];

    return out;
};

/**
 * Perform some operation over an array of vec3s.
 *
 * @param {Array} a the array of vectors to iterate over
 * @param {Number} stride Number of elements between the start of each vec3. If 0 assumes tightly packed
 * @param {Number} offset Number of elements to skip at the beginning of the array
 * @param {Number} count Number of vec3s to iterate over. If 0 iterates over entire array
 * @param {Function} fn Function to call for each vector in the array
 * @param {Object} [arg] additional argument to pass to fn
 * @returns {Array} a
 * @function
 */
vec3.forEach = function () {
    var vec = vec3.create();

    return function (a, stride, offset, count, fn, arg) {
        var i, l;
        if (!stride) {
            stride = 3;
        }

        if (!offset) {
            offset = 0;
        }

        if (count) {
            l = Math.min(count * stride + offset, a.length);
        } else {
            l = a.length;
        }

        for (i = offset; i < l; i += stride) {
            vec[0] = a[i];vec[1] = a[i + 1];vec[2] = a[i + 2];
            fn(vec, vec, arg);
            a[i] = vec[0];a[i + 1] = vec[1];a[i + 2] = vec[2];
        }

        return a;
    };
}();

/**
 * Get the angle between two 3D vectors
 * @param {vec3} a The first operand
 * @param {vec3} b The second operand
 * @returns {Number} The angle in radians
 */
vec3.angle = function (a, b) {

    var tempA = vec3.fromValues(a[0], a[1], a[2]);
    var tempB = vec3.fromValues(b[0], b[1], b[2]);

    vec3.normalize(tempA, tempA);
    vec3.normalize(tempB, tempB);

    var cosine = vec3.dot(tempA, tempB);

    if (cosine > 1.0) {
        return 0;
    } else {
        return Math.acos(cosine);
    }
};

/**
 * Returns a string representation of a vector
 *
 * @param {vec3} a vector to represent as a string
 * @returns {String} string representation of the vector
 */
vec3.str = function (a) {
    return 'vec3(' + a[0] + ', ' + a[1] + ', ' + a[2] + ')';
};

/**
 * Returns whether or not the vectors have exactly the same elements in the same position (when compared with ===)
 *
 * @param {vec3} a The first vector.
 * @param {vec3} b The second vector.
 * @returns {Boolean} True if the vectors are equal, false otherwise.
 */
vec3.exactEquals = function (a, b) {
    return a[0] === b[0] && a[1] === b[1] && a[2] === b[2];
};

/**
 * Returns whether or not the vectors have approximately the same elements in the same position.
 *
 * @param {vec3} a The first vector.
 * @param {vec3} b The second vector.
 * @returns {Boolean} True if the vectors are equal, false otherwise.
 */
vec3.equals = function (a, b) {
    var a0 = a[0],
        a1 = a[1],
        a2 = a[2];
    var b0 = b[0],
        b1 = b[1],
        b2 = b[2];
    return Math.abs(a0 - b0) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a0), Math.abs(b0)) && Math.abs(a1 - b1) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a1), Math.abs(b1)) && Math.abs(a2 - b2) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a2), Math.abs(b2));
};

/* Copyright (c) 2015, Brandon Jones, Colin MacKenzie IV.
 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:
 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.
 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE. */

/**
 * @class 3x3 Matrix
 * @name mat3
 */
var mat3 = {};

/**
 * Creates a new identity mat3
 *
 * @returns {mat3} a new 3x3 matrix
 */
mat3.create = function () {
    var out = new glMatrix.ARRAY_TYPE(9);
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 1;
    out[5] = 0;
    out[6] = 0;
    out[7] = 0;
    out[8] = 1;
    return out;
};

/**
 * Copies the upper-left 3x3 values into the given mat3.
 *
 * @param {mat3} out the receiving 3x3 matrix
 * @param {mat4} a   the source 4x4 matrix
 * @returns {mat3} out
 */
mat3.fromMat4 = function (out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[4];
    out[4] = a[5];
    out[5] = a[6];
    out[6] = a[8];
    out[7] = a[9];
    out[8] = a[10];
    return out;
};

/**
 * Creates a new mat3 initialized with values from an existing matrix
 *
 * @param {mat3} a matrix to clone
 * @returns {mat3} a new 3x3 matrix
 */
mat3.clone = function (a) {
    var out = new glMatrix.ARRAY_TYPE(9);
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    out[4] = a[4];
    out[5] = a[5];
    out[6] = a[6];
    out[7] = a[7];
    out[8] = a[8];
    return out;
};

/**
 * Copy the values from one mat3 to another
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the source matrix
 * @returns {mat3} out
 */
mat3.copy = function (out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    out[4] = a[4];
    out[5] = a[5];
    out[6] = a[6];
    out[7] = a[7];
    out[8] = a[8];
    return out;
};

/**
 * Create a new mat3 with the given values
 *
 * @param {Number} m00 Component in column 0, row 0 position (index 0)
 * @param {Number} m01 Component in column 0, row 1 position (index 1)
 * @param {Number} m02 Component in column 0, row 2 position (index 2)
 * @param {Number} m10 Component in column 1, row 0 position (index 3)
 * @param {Number} m11 Component in column 1, row 1 position (index 4)
 * @param {Number} m12 Component in column 1, row 2 position (index 5)
 * @param {Number} m20 Component in column 2, row 0 position (index 6)
 * @param {Number} m21 Component in column 2, row 1 position (index 7)
 * @param {Number} m22 Component in column 2, row 2 position (index 8)
 * @returns {mat3} A new mat3
 */
mat3.fromValues = function (m00, m01, m02, m10, m11, m12, m20, m21, m22) {
    var out = new glMatrix.ARRAY_TYPE(9);
    out[0] = m00;
    out[1] = m01;
    out[2] = m02;
    out[3] = m10;
    out[4] = m11;
    out[5] = m12;
    out[6] = m20;
    out[7] = m21;
    out[8] = m22;
    return out;
};

/**
 * Set the components of a mat3 to the given values
 *
 * @param {mat3} out the receiving matrix
 * @param {Number} m00 Component in column 0, row 0 position (index 0)
 * @param {Number} m01 Component in column 0, row 1 position (index 1)
 * @param {Number} m02 Component in column 0, row 2 position (index 2)
 * @param {Number} m10 Component in column 1, row 0 position (index 3)
 * @param {Number} m11 Component in column 1, row 1 position (index 4)
 * @param {Number} m12 Component in column 1, row 2 position (index 5)
 * @param {Number} m20 Component in column 2, row 0 position (index 6)
 * @param {Number} m21 Component in column 2, row 1 position (index 7)
 * @param {Number} m22 Component in column 2, row 2 position (index 8)
 * @returns {mat3} out
 */
mat3.set = function (out, m00, m01, m02, m10, m11, m12, m20, m21, m22) {
    out[0] = m00;
    out[1] = m01;
    out[2] = m02;
    out[3] = m10;
    out[4] = m11;
    out[5] = m12;
    out[6] = m20;
    out[7] = m21;
    out[8] = m22;
    return out;
};

/**
 * Set a mat3 to the identity matrix
 *
 * @param {mat3} out the receiving matrix
 * @returns {mat3} out
 */
mat3.identity = function (out) {
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 1;
    out[5] = 0;
    out[6] = 0;
    out[7] = 0;
    out[8] = 1;
    return out;
};

/**
 * Transpose the values of a mat3
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the source matrix
 * @returns {mat3} out
 */
mat3.transpose = function (out, a) {
    // If we are transposing ourselves we can skip a few steps but have to cache some values
    if (out === a) {
        var a01 = a[1],
            a02 = a[2],
            a12 = a[5];
        out[1] = a[3];
        out[2] = a[6];
        out[3] = a01;
        out[5] = a[7];
        out[6] = a02;
        out[7] = a12;
    } else {
        out[0] = a[0];
        out[1] = a[3];
        out[2] = a[6];
        out[3] = a[1];
        out[4] = a[4];
        out[5] = a[7];
        out[6] = a[2];
        out[7] = a[5];
        out[8] = a[8];
    }

    return out;
};

/**
 * Inverts a mat3
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the source matrix
 * @returns {mat3} out
 */
mat3.invert = function (out, a) {
    var a00 = a[0],
        a01 = a[1],
        a02 = a[2],
        a10 = a[3],
        a11 = a[4],
        a12 = a[5],
        a20 = a[6],
        a21 = a[7],
        a22 = a[8],
        b01 = a22 * a11 - a12 * a21,
        b11 = -a22 * a10 + a12 * a20,
        b21 = a21 * a10 - a11 * a20,


    // Calculate the determinant
    det = a00 * b01 + a01 * b11 + a02 * b21;

    if (!det) {
        return null;
    }
    det = 1.0 / det;

    out[0] = b01 * det;
    out[1] = (-a22 * a01 + a02 * a21) * det;
    out[2] = (a12 * a01 - a02 * a11) * det;
    out[3] = b11 * det;
    out[4] = (a22 * a00 - a02 * a20) * det;
    out[5] = (-a12 * a00 + a02 * a10) * det;
    out[6] = b21 * det;
    out[7] = (-a21 * a00 + a01 * a20) * det;
    out[8] = (a11 * a00 - a01 * a10) * det;
    return out;
};

/**
 * Calculates the adjugate of a mat3
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the source matrix
 * @returns {mat3} out
 */
mat3.adjoint = function (out, a) {
    var a00 = a[0],
        a01 = a[1],
        a02 = a[2],
        a10 = a[3],
        a11 = a[4],
        a12 = a[5],
        a20 = a[6],
        a21 = a[7],
        a22 = a[8];

    out[0] = a11 * a22 - a12 * a21;
    out[1] = a02 * a21 - a01 * a22;
    out[2] = a01 * a12 - a02 * a11;
    out[3] = a12 * a20 - a10 * a22;
    out[4] = a00 * a22 - a02 * a20;
    out[5] = a02 * a10 - a00 * a12;
    out[6] = a10 * a21 - a11 * a20;
    out[7] = a01 * a20 - a00 * a21;
    out[8] = a00 * a11 - a01 * a10;
    return out;
};

/**
 * Calculates the determinant of a mat3
 *
 * @param {mat3} a the source matrix
 * @returns {Number} determinant of a
 */
mat3.determinant = function (a) {
    var a00 = a[0],
        a01 = a[1],
        a02 = a[2],
        a10 = a[3],
        a11 = a[4],
        a12 = a[5],
        a20 = a[6],
        a21 = a[7],
        a22 = a[8];

    return a00 * (a22 * a11 - a12 * a21) + a01 * (-a22 * a10 + a12 * a20) + a02 * (a21 * a10 - a11 * a20);
};

/**
 * Multiplies two mat3's
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the first operand
 * @param {mat3} b the second operand
 * @returns {mat3} out
 */
mat3.multiply = function (out, a, b) {
    var a00 = a[0],
        a01 = a[1],
        a02 = a[2],
        a10 = a[3],
        a11 = a[4],
        a12 = a[5],
        a20 = a[6],
        a21 = a[7],
        a22 = a[8],
        b00 = b[0],
        b01 = b[1],
        b02 = b[2],
        b10 = b[3],
        b11 = b[4],
        b12 = b[5],
        b20 = b[6],
        b21 = b[7],
        b22 = b[8];

    out[0] = b00 * a00 + b01 * a10 + b02 * a20;
    out[1] = b00 * a01 + b01 * a11 + b02 * a21;
    out[2] = b00 * a02 + b01 * a12 + b02 * a22;

    out[3] = b10 * a00 + b11 * a10 + b12 * a20;
    out[4] = b10 * a01 + b11 * a11 + b12 * a21;
    out[5] = b10 * a02 + b11 * a12 + b12 * a22;

    out[6] = b20 * a00 + b21 * a10 + b22 * a20;
    out[7] = b20 * a01 + b21 * a11 + b22 * a21;
    out[8] = b20 * a02 + b21 * a12 + b22 * a22;
    return out;
};

/**
 * Alias for {@link mat3.multiply}
 * @function
 */
mat3.mul = mat3.multiply;

/**
 * Translate a mat3 by the given vector
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the matrix to translate
 * @param {vec2} v vector to translate by
 * @returns {mat3} out
 */
mat3.translate = function (out, a, v) {
    var a00 = a[0],
        a01 = a[1],
        a02 = a[2],
        a10 = a[3],
        a11 = a[4],
        a12 = a[5],
        a20 = a[6],
        a21 = a[7],
        a22 = a[8],
        x = v[0],
        y = v[1];

    out[0] = a00;
    out[1] = a01;
    out[2] = a02;

    out[3] = a10;
    out[4] = a11;
    out[5] = a12;

    out[6] = x * a00 + y * a10 + a20;
    out[7] = x * a01 + y * a11 + a21;
    out[8] = x * a02 + y * a12 + a22;
    return out;
};

/**
 * Rotates a mat3 by the given angle
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat3} out
 */
mat3.rotate = function (out, a, rad) {
    var a00 = a[0],
        a01 = a[1],
        a02 = a[2],
        a10 = a[3],
        a11 = a[4],
        a12 = a[5],
        a20 = a[6],
        a21 = a[7],
        a22 = a[8],
        s = Math.sin(rad),
        c = Math.cos(rad);

    out[0] = c * a00 + s * a10;
    out[1] = c * a01 + s * a11;
    out[2] = c * a02 + s * a12;

    out[3] = c * a10 - s * a00;
    out[4] = c * a11 - s * a01;
    out[5] = c * a12 - s * a02;

    out[6] = a20;
    out[7] = a21;
    out[8] = a22;
    return out;
};

/**
 * Scales the mat3 by the dimensions in the given vec2
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the matrix to rotate
 * @param {vec2} v the vec2 to scale the matrix by
 * @returns {mat3} out
 **/
mat3.scale = function (out, a, v) {
    var x = v[0],
        y = v[1];

    out[0] = x * a[0];
    out[1] = x * a[1];
    out[2] = x * a[2];

    out[3] = y * a[3];
    out[4] = y * a[4];
    out[5] = y * a[5];

    out[6] = a[6];
    out[7] = a[7];
    out[8] = a[8];
    return out;
};

/**
 * Creates a matrix from a vector translation
 * This is equivalent to (but much faster than):
 *
 *     mat3.identity(dest);
 *     mat3.translate(dest, dest, vec);
 *
 * @param {mat3} out mat3 receiving operation result
 * @param {vec2} v Translation vector
 * @returns {mat3} out
 */
mat3.fromTranslation = function (out, v) {
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 1;
    out[5] = 0;
    out[6] = v[0];
    out[7] = v[1];
    out[8] = 1;
    return out;
};

/**
 * Creates a matrix from a given angle
 * This is equivalent to (but much faster than):
 *
 *     mat3.identity(dest);
 *     mat3.rotate(dest, dest, rad);
 *
 * @param {mat3} out mat3 receiving operation result
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat3} out
 */
mat3.fromRotation = function (out, rad) {
    var s = Math.sin(rad),
        c = Math.cos(rad);

    out[0] = c;
    out[1] = s;
    out[2] = 0;

    out[3] = -s;
    out[4] = c;
    out[5] = 0;

    out[6] = 0;
    out[7] = 0;
    out[8] = 1;
    return out;
};

/**
 * Creates a matrix from a vector scaling
 * This is equivalent to (but much faster than):
 *
 *     mat3.identity(dest);
 *     mat3.scale(dest, dest, vec);
 *
 * @param {mat3} out mat3 receiving operation result
 * @param {vec2} v Scaling vector
 * @returns {mat3} out
 */
mat3.fromScaling = function (out, v) {
    out[0] = v[0];
    out[1] = 0;
    out[2] = 0;

    out[3] = 0;
    out[4] = v[1];
    out[5] = 0;

    out[6] = 0;
    out[7] = 0;
    out[8] = 1;
    return out;
};

/**
 * Copies the values from a mat2d into a mat3
 *
 * @param {mat3} out the receiving matrix
 * @param {mat2d} a the matrix to copy
 * @returns {mat3} out
 **/
mat3.fromMat2d = function (out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = 0;

    out[3] = a[2];
    out[4] = a[3];
    out[5] = 0;

    out[6] = a[4];
    out[7] = a[5];
    out[8] = 1;
    return out;
};

/**
 * Calculates a 3x3 matrix from the given quaternion
 *
 * @param {mat3} out mat3 receiving operation result
 * @param {quat} q Quaternion to create matrix from
 *
 * @returns {mat3} out
 */
mat3.fromQuat = function (out, q) {
    var x = q[0],
        y = q[1],
        z = q[2],
        w = q[3],
        x2 = x + x,
        y2 = y + y,
        z2 = z + z,
        xx = x * x2,
        yx = y * x2,
        yy = y * y2,
        zx = z * x2,
        zy = z * y2,
        zz = z * z2,
        wx = w * x2,
        wy = w * y2,
        wz = w * z2;

    out[0] = 1 - yy - zz;
    out[3] = yx - wz;
    out[6] = zx + wy;

    out[1] = yx + wz;
    out[4] = 1 - xx - zz;
    out[7] = zy - wx;

    out[2] = zx - wy;
    out[5] = zy + wx;
    out[8] = 1 - xx - yy;

    return out;
};

/**
 * Calculates a 3x3 normal matrix (transpose inverse) from the 4x4 matrix
 *
 * @param {mat3} out mat3 receiving operation result
 * @param {mat4} a Mat4 to derive the normal matrix from
 *
 * @returns {mat3} out
 */
mat3.normalFromMat4 = function (out, a) {
    var a00 = a[0],
        a01 = a[1],
        a02 = a[2],
        a03 = a[3],
        a10 = a[4],
        a11 = a[5],
        a12 = a[6],
        a13 = a[7],
        a20 = a[8],
        a21 = a[9],
        a22 = a[10],
        a23 = a[11],
        a30 = a[12],
        a31 = a[13],
        a32 = a[14],
        a33 = a[15],
        b00 = a00 * a11 - a01 * a10,
        b01 = a00 * a12 - a02 * a10,
        b02 = a00 * a13 - a03 * a10,
        b03 = a01 * a12 - a02 * a11,
        b04 = a01 * a13 - a03 * a11,
        b05 = a02 * a13 - a03 * a12,
        b06 = a20 * a31 - a21 * a30,
        b07 = a20 * a32 - a22 * a30,
        b08 = a20 * a33 - a23 * a30,
        b09 = a21 * a32 - a22 * a31,
        b10 = a21 * a33 - a23 * a31,
        b11 = a22 * a33 - a23 * a32,


    // Calculate the determinant
    det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;

    if (!det) {
        return null;
    }
    det = 1.0 / det;

    out[0] = (a11 * b11 - a12 * b10 + a13 * b09) * det;
    out[1] = (a12 * b08 - a10 * b11 - a13 * b07) * det;
    out[2] = (a10 * b10 - a11 * b08 + a13 * b06) * det;

    out[3] = (a02 * b10 - a01 * b11 - a03 * b09) * det;
    out[4] = (a00 * b11 - a02 * b08 + a03 * b07) * det;
    out[5] = (a01 * b08 - a00 * b10 - a03 * b06) * det;

    out[6] = (a31 * b05 - a32 * b04 + a33 * b03) * det;
    out[7] = (a32 * b02 - a30 * b05 - a33 * b01) * det;
    out[8] = (a30 * b04 - a31 * b02 + a33 * b00) * det;

    return out;
};

/**
 * Returns a string representation of a mat3
 *
 * @param {mat3} a matrix to represent as a string
 * @returns {String} string representation of the matrix
 */
mat3.str = function (a) {
    return 'mat3(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' + a[3] + ', ' + a[4] + ', ' + a[5] + ', ' + a[6] + ', ' + a[7] + ', ' + a[8] + ')';
};

/**
 * Returns Frobenius norm of a mat3
 *
 * @param {mat3} a the matrix to calculate Frobenius norm of
 * @returns {Number} Frobenius norm
 */
mat3.frob = function (a) {
    return Math.sqrt(Math.pow(a[0], 2) + Math.pow(a[1], 2) + Math.pow(a[2], 2) + Math.pow(a[3], 2) + Math.pow(a[4], 2) + Math.pow(a[5], 2) + Math.pow(a[6], 2) + Math.pow(a[7], 2) + Math.pow(a[8], 2));
};

/**
 * Adds two mat3's
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the first operand
 * @param {mat3} b the second operand
 * @returns {mat3} out
 */
mat3.add = function (out, a, b) {
    out[0] = a[0] + b[0];
    out[1] = a[1] + b[1];
    out[2] = a[2] + b[2];
    out[3] = a[3] + b[3];
    out[4] = a[4] + b[4];
    out[5] = a[5] + b[5];
    out[6] = a[6] + b[6];
    out[7] = a[7] + b[7];
    out[8] = a[8] + b[8];
    return out;
};

/**
 * Subtracts matrix b from matrix a
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the first operand
 * @param {mat3} b the second operand
 * @returns {mat3} out
 */
mat3.subtract = function (out, a, b) {
    out[0] = a[0] - b[0];
    out[1] = a[1] - b[1];
    out[2] = a[2] - b[2];
    out[3] = a[3] - b[3];
    out[4] = a[4] - b[4];
    out[5] = a[5] - b[5];
    out[6] = a[6] - b[6];
    out[7] = a[7] - b[7];
    out[8] = a[8] - b[8];
    return out;
};

/**
 * Alias for {@link mat3.subtract}
 * @function
 */
mat3.sub = mat3.subtract;

/**
 * Multiply each element of the matrix by a scalar.
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the matrix to scale
 * @param {Number} b amount to scale the matrix's elements by
 * @returns {mat3} out
 */
mat3.multiplyScalar = function (out, a, b) {
    out[0] = a[0] * b;
    out[1] = a[1] * b;
    out[2] = a[2] * b;
    out[3] = a[3] * b;
    out[4] = a[4] * b;
    out[5] = a[5] * b;
    out[6] = a[6] * b;
    out[7] = a[7] * b;
    out[8] = a[8] * b;
    return out;
};

/**
 * Adds two mat3's after multiplying each element of the second operand by a scalar value.
 *
 * @param {mat3} out the receiving vector
 * @param {mat3} a the first operand
 * @param {mat3} b the second operand
 * @param {Number} scale the amount to scale b's elements by before adding
 * @returns {mat3} out
 */
mat3.multiplyScalarAndAdd = function (out, a, b, scale) {
    out[0] = a[0] + b[0] * scale;
    out[1] = a[1] + b[1] * scale;
    out[2] = a[2] + b[2] * scale;
    out[3] = a[3] + b[3] * scale;
    out[4] = a[4] + b[4] * scale;
    out[5] = a[5] + b[5] * scale;
    out[6] = a[6] + b[6] * scale;
    out[7] = a[7] + b[7] * scale;
    out[8] = a[8] + b[8] * scale;
    return out;
};

/**
 * Returns whether or not the matrices have exactly the same elements in the same position (when compared with ===)
 *
 * @param {mat3} a The first matrix.
 * @param {mat3} b The second matrix.
 * @returns {Boolean} True if the matrices are equal, false otherwise.
 */
mat3.exactEquals = function (a, b) {
    return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3] && a[4] === b[4] && a[5] === b[5] && a[6] === b[6] && a[7] === b[7] && a[8] === b[8];
};

/**
 * Returns whether or not the matrices have approximately the same elements in the same position.
 *
 * @param {mat3} a The first matrix.
 * @param {mat3} b The second matrix.
 * @returns {Boolean} True if the matrices are equal, false otherwise.
 */
mat3.equals = function (a, b) {
    var a0 = a[0],
        a1 = a[1],
        a2 = a[2],
        a3 = a[3],
        a4 = a[4],
        a5 = a[5],
        a6 = a[6],
        a7 = a[7],
        a8 = a[8];
    var b0 = b[0],
        b1 = b[1],
        b2 = b[2],
        b3 = b[3],
        b4 = b[4],
        b5 = b[5],
        b6 = b[6],
        b7 = b[7],
        b8 = b[8];
    return Math.abs(a0 - b0) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a0), Math.abs(b0)) && Math.abs(a1 - b1) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a1), Math.abs(b1)) && Math.abs(a2 - b2) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a2), Math.abs(b2)) && Math.abs(a3 - b3) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a3), Math.abs(b3)) && Math.abs(a4 - b4) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a4), Math.abs(b4)) && Math.abs(a5 - b5) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a5), Math.abs(b5)) && Math.abs(a6 - b6) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a6), Math.abs(b6)) && Math.abs(a7 - b7) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a7), Math.abs(b7)) && Math.abs(a8 - b8) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a8), Math.abs(b8));
};

/* Copyright (c) 2015, Brandon Jones, Colin MacKenzie IV.
 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:
 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.
 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE. */

/**
 * @class 4 Dimensional Vector
 * @name vec4
 */
var vec4 = {};

/**
 * Creates a new, empty vec4
 *
 * @returns {vec4} a new 4D vector
 */
vec4.create = function () {
    var out = new glMatrix.ARRAY_TYPE(4);
    out[0] = 0;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    return out;
};

/**
 * Creates a new vec4 initialized with values from an existing vector
 *
 * @param {vec4} a vector to clone
 * @returns {vec4} a new 4D vector
 */
vec4.clone = function (a) {
    var out = new glMatrix.ARRAY_TYPE(4);
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    return out;
};

/**
 * Creates a new vec4 initialized with the given values
 *
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @param {Number} w W component
 * @returns {vec4} a new 4D vector
 */
vec4.fromValues = function (x, y, z, w) {
    var out = new glMatrix.ARRAY_TYPE(4);
    out[0] = x;
    out[1] = y;
    out[2] = z;
    out[3] = w;
    return out;
};

/**
 * Copy the values from one vec4 to another
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the source vector
 * @returns {vec4} out
 */
vec4.copy = function (out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    return out;
};

/**
 * Set the components of a vec4 to the given values
 *
 * @param {vec4} out the receiving vector
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @param {Number} w W component
 * @returns {vec4} out
 */
vec4.set = function (out, x, y, z, w) {
    out[0] = x;
    out[1] = y;
    out[2] = z;
    out[3] = w;
    return out;
};

/**
 * Adds two vec4's
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {vec4} out
 */
vec4.add = function (out, a, b) {
    out[0] = a[0] + b[0];
    out[1] = a[1] + b[1];
    out[2] = a[2] + b[2];
    out[3] = a[3] + b[3];
    return out;
};

/**
 * Subtracts vector b from vector a
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {vec4} out
 */
vec4.subtract = function (out, a, b) {
    out[0] = a[0] - b[0];
    out[1] = a[1] - b[1];
    out[2] = a[2] - b[2];
    out[3] = a[3] - b[3];
    return out;
};

/**
 * Alias for {@link vec4.subtract}
 * @function
 */
vec4.sub = vec4.subtract;

/**
 * Multiplies two vec4's
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {vec4} out
 */
vec4.multiply = function (out, a, b) {
    out[0] = a[0] * b[0];
    out[1] = a[1] * b[1];
    out[2] = a[2] * b[2];
    out[3] = a[3] * b[3];
    return out;
};

/**
 * Alias for {@link vec4.multiply}
 * @function
 */
vec4.mul = vec4.multiply;

/**
 * Divides two vec4's
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {vec4} out
 */
vec4.divide = function (out, a, b) {
    out[0] = a[0] / b[0];
    out[1] = a[1] / b[1];
    out[2] = a[2] / b[2];
    out[3] = a[3] / b[3];
    return out;
};

/**
 * Alias for {@link vec4.divide}
 * @function
 */
vec4.div = vec4.divide;

/**
 * Math.ceil the components of a vec4
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a vector to ceil
 * @returns {vec4} out
 */
vec4.ceil = function (out, a) {
    out[0] = Math.ceil(a[0]);
    out[1] = Math.ceil(a[1]);
    out[2] = Math.ceil(a[2]);
    out[3] = Math.ceil(a[3]);
    return out;
};

/**
 * Math.floor the components of a vec4
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a vector to floor
 * @returns {vec4} out
 */
vec4.floor = function (out, a) {
    out[0] = Math.floor(a[0]);
    out[1] = Math.floor(a[1]);
    out[2] = Math.floor(a[2]);
    out[3] = Math.floor(a[3]);
    return out;
};

/**
 * Returns the minimum of two vec4's
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {vec4} out
 */
vec4.min = function (out, a, b) {
    out[0] = Math.min(a[0], b[0]);
    out[1] = Math.min(a[1], b[1]);
    out[2] = Math.min(a[2], b[2]);
    out[3] = Math.min(a[3], b[3]);
    return out;
};

/**
 * Returns the maximum of two vec4's
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {vec4} out
 */
vec4.max = function (out, a, b) {
    out[0] = Math.max(a[0], b[0]);
    out[1] = Math.max(a[1], b[1]);
    out[2] = Math.max(a[2], b[2]);
    out[3] = Math.max(a[3], b[3]);
    return out;
};

/**
 * Math.round the components of a vec4
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a vector to round
 * @returns {vec4} out
 */
vec4.round = function (out, a) {
    out[0] = Math.round(a[0]);
    out[1] = Math.round(a[1]);
    out[2] = Math.round(a[2]);
    out[3] = Math.round(a[3]);
    return out;
};

/**
 * Scales a vec4 by a scalar number
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the vector to scale
 * @param {Number} b amount to scale the vector by
 * @returns {vec4} out
 */
vec4.scale = function (out, a, b) {
    out[0] = a[0] * b;
    out[1] = a[1] * b;
    out[2] = a[2] * b;
    out[3] = a[3] * b;
    return out;
};

/**
 * Adds two vec4's after scaling the second operand by a scalar value
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @param {Number} scale the amount to scale b by before adding
 * @returns {vec4} out
 */
vec4.scaleAndAdd = function (out, a, b, scale) {
    out[0] = a[0] + b[0] * scale;
    out[1] = a[1] + b[1] * scale;
    out[2] = a[2] + b[2] * scale;
    out[3] = a[3] + b[3] * scale;
    return out;
};

/**
 * Calculates the euclidian distance between two vec4's
 *
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {Number} distance between a and b
 */
vec4.distance = function (a, b) {
    var x = b[0] - a[0],
        y = b[1] - a[1],
        z = b[2] - a[2],
        w = b[3] - a[3];
    return Math.sqrt(x * x + y * y + z * z + w * w);
};

/**
 * Alias for {@link vec4.distance}
 * @function
 */
vec4.dist = vec4.distance;

/**
 * Calculates the squared euclidian distance between two vec4's
 *
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {Number} squared distance between a and b
 */
vec4.squaredDistance = function (a, b) {
    var x = b[0] - a[0],
        y = b[1] - a[1],
        z = b[2] - a[2],
        w = b[3] - a[3];
    return x * x + y * y + z * z + w * w;
};

/**
 * Alias for {@link vec4.squaredDistance}
 * @function
 */
vec4.sqrDist = vec4.squaredDistance;

/**
 * Calculates the length of a vec4
 *
 * @param {vec4} a vector to calculate length of
 * @returns {Number} length of a
 */
vec4.length = function (a) {
    var x = a[0],
        y = a[1],
        z = a[2],
        w = a[3];
    return Math.sqrt(x * x + y * y + z * z + w * w);
};

/**
 * Alias for {@link vec4.length}
 * @function
 */
vec4.len = vec4.length;

/**
 * Calculates the squared length of a vec4
 *
 * @param {vec4} a vector to calculate squared length of
 * @returns {Number} squared length of a
 */
vec4.squaredLength = function (a) {
    var x = a[0],
        y = a[1],
        z = a[2],
        w = a[3];
    return x * x + y * y + z * z + w * w;
};

/**
 * Alias for {@link vec4.squaredLength}
 * @function
 */
vec4.sqrLen = vec4.squaredLength;

/**
 * Negates the components of a vec4
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a vector to negate
 * @returns {vec4} out
 */
vec4.negate = function (out, a) {
    out[0] = -a[0];
    out[1] = -a[1];
    out[2] = -a[2];
    out[3] = -a[3];
    return out;
};

/**
 * Returns the inverse of the components of a vec4
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a vector to invert
 * @returns {vec4} out
 */
vec4.inverse = function (out, a) {
    out[0] = 1.0 / a[0];
    out[1] = 1.0 / a[1];
    out[2] = 1.0 / a[2];
    out[3] = 1.0 / a[3];
    return out;
};

/**
 * Normalize a vec4
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a vector to normalize
 * @returns {vec4} out
 */
vec4.normalize = function (out, a) {
    var x = a[0],
        y = a[1],
        z = a[2],
        w = a[3];
    var len = x * x + y * y + z * z + w * w;
    if (len > 0) {
        len = 1 / Math.sqrt(len);
        out[0] = x * len;
        out[1] = y * len;
        out[2] = z * len;
        out[3] = w * len;
    }
    return out;
};

/**
 * Calculates the dot product of two vec4's
 *
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {Number} dot product of a and b
 */
vec4.dot = function (a, b) {
    return a[0] * b[0] + a[1] * b[1] + a[2] * b[2] + a[3] * b[3];
};

/**
 * Performs a linear interpolation between two vec4's
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @param {Number} t interpolation amount between the two inputs
 * @returns {vec4} out
 */
vec4.lerp = function (out, a, b, t) {
    var ax = a[0],
        ay = a[1],
        az = a[2],
        aw = a[3];
    out[0] = ax + t * (b[0] - ax);
    out[1] = ay + t * (b[1] - ay);
    out[2] = az + t * (b[2] - az);
    out[3] = aw + t * (b[3] - aw);
    return out;
};

/**
 * Generates a random vector with the given scale
 *
 * @param {vec4} out the receiving vector
 * @param {Number} [scale] Length of the resulting vector. If ommitted, a unit vector will be returned
 * @returns {vec4} out
 */
vec4.random = function (out, scale) {
    scale = scale || 1.0;

    //TODO: This is a pretty awful way of doing this. Find something better.
    out[0] = glMatrix.RANDOM();
    out[1] = glMatrix.RANDOM();
    out[2] = glMatrix.RANDOM();
    out[3] = glMatrix.RANDOM();
    vec4.normalize(out, out);
    vec4.scale(out, out, scale);
    return out;
};

/**
 * Transforms the vec4 with a mat4.
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the vector to transform
 * @param {mat4} m matrix to transform with
 * @returns {vec4} out
 */
vec4.transformMat4 = function (out, a, m) {
    var x = a[0],
        y = a[1],
        z = a[2],
        w = a[3];
    out[0] = m[0] * x + m[4] * y + m[8] * z + m[12] * w;
    out[1] = m[1] * x + m[5] * y + m[9] * z + m[13] * w;
    out[2] = m[2] * x + m[6] * y + m[10] * z + m[14] * w;
    out[3] = m[3] * x + m[7] * y + m[11] * z + m[15] * w;
    return out;
};

/**
 * Transforms the vec4 with a quat
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the vector to transform
 * @param {quat} q quaternion to transform with
 * @returns {vec4} out
 */
vec4.transformQuat = function (out, a, q) {
    var x = a[0],
        y = a[1],
        z = a[2],
        qx = q[0],
        qy = q[1],
        qz = q[2],
        qw = q[3],


    // calculate quat * vec
    ix = qw * x + qy * z - qz * y,
        iy = qw * y + qz * x - qx * z,
        iz = qw * z + qx * y - qy * x,
        iw = -qx * x - qy * y - qz * z;

    // calculate result * inverse quat
    out[0] = ix * qw + iw * -qx + iy * -qz - iz * -qy;
    out[1] = iy * qw + iw * -qy + iz * -qx - ix * -qz;
    out[2] = iz * qw + iw * -qz + ix * -qy - iy * -qx;
    out[3] = a[3];
    return out;
};

/**
 * Perform some operation over an array of vec4s.
 *
 * @param {Array} a the array of vectors to iterate over
 * @param {Number} stride Number of elements between the start of each vec4. If 0 assumes tightly packed
 * @param {Number} offset Number of elements to skip at the beginning of the array
 * @param {Number} count Number of vec4s to iterate over. If 0 iterates over entire array
 * @param {Function} fn Function to call for each vector in the array
 * @param {Object} [arg] additional argument to pass to fn
 * @returns {Array} a
 * @function
 */
vec4.forEach = function () {
    var vec = vec4.create();

    return function (a, stride, offset, count, fn, arg) {
        var i, l;
        if (!stride) {
            stride = 4;
        }

        if (!offset) {
            offset = 0;
        }

        if (count) {
            l = Math.min(count * stride + offset, a.length);
        } else {
            l = a.length;
        }

        for (i = offset; i < l; i += stride) {
            vec[0] = a[i];vec[1] = a[i + 1];vec[2] = a[i + 2];vec[3] = a[i + 3];
            fn(vec, vec, arg);
            a[i] = vec[0];a[i + 1] = vec[1];a[i + 2] = vec[2];a[i + 3] = vec[3];
        }

        return a;
    };
}();

/**
 * Returns a string representation of a vector
 *
 * @param {vec4} a vector to represent as a string
 * @returns {String} string representation of the vector
 */
vec4.str = function (a) {
    return 'vec4(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' + a[3] + ')';
};

/**
 * Returns whether or not the vectors have exactly the same elements in the same position (when compared with ===)
 *
 * @param {vec4} a The first vector.
 * @param {vec4} b The second vector.
 * @returns {Boolean} True if the vectors are equal, false otherwise.
 */
vec4.exactEquals = function (a, b) {
    return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3];
};

/**
 * Returns whether or not the vectors have approximately the same elements in the same position.
 *
 * @param {vec4} a The first vector.
 * @param {vec4} b The second vector.
 * @returns {Boolean} True if the vectors are equal, false otherwise.
 */
vec4.equals = function (a, b) {
    var a0 = a[0],
        a1 = a[1],
        a2 = a[2],
        a3 = a[3];
    var b0 = b[0],
        b1 = b[1],
        b2 = b[2],
        b3 = b[3];
    return Math.abs(a0 - b0) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a0), Math.abs(b0)) && Math.abs(a1 - b1) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a1), Math.abs(b1)) && Math.abs(a2 - b2) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a2), Math.abs(b2)) && Math.abs(a3 - b3) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a3), Math.abs(b3));
};

/* Copyright (c) 2015, Brandon Jones, Colin MacKenzie IV.
 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:
 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.
 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE. */

/**
 * @class Quaternion
 * @name quat
 */
var quat = {};

/**
 * Creates a new identity quat
 *
 * @returns {quat} a new quaternion
 */
quat.create = function () {
    var out = new glMatrix.ARRAY_TYPE(4);
    out[0] = 0;
    out[1] = 0;
    out[2] = 0;
    out[3] = 1;
    return out;
};

/**
 * Sets a quaternion to represent the shortest rotation from one
 * vector to another.
 *
 * Both vectors are assumed to be unit length.
 *
 * @param {quat} out the receiving quaternion.
 * @param {vec3} a the initial vector
 * @param {vec3} b the destination vector
 * @returns {quat} out
 */
quat.rotationTo = function () {
    var tmpvec3 = vec3.create();
    var xUnitVec3 = vec3.fromValues(1, 0, 0);
    var yUnitVec3 = vec3.fromValues(0, 1, 0);

    return function (out, a, b) {
        var dot = vec3.dot(a, b);
        if (dot < -0.999999) {
            vec3.cross(tmpvec3, xUnitVec3, a);
            if (vec3.length(tmpvec3) < 0.000001) vec3.cross(tmpvec3, yUnitVec3, a);
            vec3.normalize(tmpvec3, tmpvec3);
            quat.setAxisAngle(out, tmpvec3, Math.PI);
            return out;
        } else if (dot > 0.999999) {
            out[0] = 0;
            out[1] = 0;
            out[2] = 0;
            out[3] = 1;
            return out;
        } else {
            vec3.cross(tmpvec3, a, b);
            out[0] = tmpvec3[0];
            out[1] = tmpvec3[1];
            out[2] = tmpvec3[2];
            out[3] = 1 + dot;
            return quat.normalize(out, out);
        }
    };
}();

/**
 * Sets the specified quaternion with values corresponding to the given
 * axes. Each axis is a vec3 and is expected to be unit length and
 * perpendicular to all other specified axes.
 *
 * @param {vec3} view  the vector representing the viewing direction
 * @param {vec3} right the vector representing the local "right" direction
 * @param {vec3} up    the vector representing the local "up" direction
 * @returns {quat} out
 */
quat.setAxes = function () {
    var matr = mat3.create();

    return function (out, view, right, up) {
        matr[0] = right[0];
        matr[3] = right[1];
        matr[6] = right[2];

        matr[1] = up[0];
        matr[4] = up[1];
        matr[7] = up[2];

        matr[2] = -view[0];
        matr[5] = -view[1];
        matr[8] = -view[2];

        return quat.normalize(out, quat.fromMat3(out, matr));
    };
}();

/**
 * Creates a new quat initialized with values from an existing quaternion
 *
 * @param {quat} a quaternion to clone
 * @returns {quat} a new quaternion
 * @function
 */
quat.clone = vec4.clone;

/**
 * Creates a new quat initialized with the given values
 *
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @param {Number} w W component
 * @returns {quat} a new quaternion
 * @function
 */
quat.fromValues = vec4.fromValues;

/**
 * Copy the values from one quat to another
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a the source quaternion
 * @returns {quat} out
 * @function
 */
quat.copy = vec4.copy;

/**
 * Set the components of a quat to the given values
 *
 * @param {quat} out the receiving quaternion
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @param {Number} w W component
 * @returns {quat} out
 * @function
 */
quat.set = vec4.set;

/**
 * Set a quat to the identity quaternion
 *
 * @param {quat} out the receiving quaternion
 * @returns {quat} out
 */
quat.identity = function (out) {
    out[0] = 0;
    out[1] = 0;
    out[2] = 0;
    out[3] = 1;
    return out;
};

/**
 * Sets a quat from the given angle and rotation axis,
 * then returns it.
 *
 * @param {quat} out the receiving quaternion
 * @param {vec3} axis the axis around which to rotate
 * @param {Number} rad the angle in radians
 * @returns {quat} out
 **/
quat.setAxisAngle = function (out, axis, rad) {
    rad = rad * 0.5;
    var s = Math.sin(rad);
    out[0] = s * axis[0];
    out[1] = s * axis[1];
    out[2] = s * axis[2];
    out[3] = Math.cos(rad);
    return out;
};

/**
 * Gets the rotation axis and angle for a given
 *  quaternion. If a quaternion is created with
 *  setAxisAngle, this method will return the same
 *  values as providied in the original parameter list
 *  OR functionally equivalent values.
 * Example: The quaternion formed by axis [0, 0, 1] and
 *  angle -90 is the same as the quaternion formed by
 *  [0, 0, 1] and 270. This method favors the latter.
 * @param  {vec3} out_axis  Vector receiving the axis of rotation
 * @param  {quat} q     Quaternion to be decomposed
 * @return {Number}     Angle, in radians, of the rotation
 */
quat.getAxisAngle = function (out_axis, q) {
    var rad = Math.acos(q[3]) * 2.0;
    var s = Math.sin(rad / 2.0);
    if (s != 0.0) {
        out_axis[0] = q[0] / s;
        out_axis[1] = q[1] / s;
        out_axis[2] = q[2] / s;
    } else {
        // If s is zero, return any axis (no rotation - axis does not matter)
        out_axis[0] = 1;
        out_axis[1] = 0;
        out_axis[2] = 0;
    }
    return rad;
};

/**
 * Adds two quat's
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a the first operand
 * @param {quat} b the second operand
 * @returns {quat} out
 * @function
 */
quat.add = vec4.add;

/**
 * Multiplies two quat's
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a the first operand
 * @param {quat} b the second operand
 * @returns {quat} out
 */
quat.multiply = function (out, a, b) {
    var ax = a[0],
        ay = a[1],
        az = a[2],
        aw = a[3],
        bx = b[0],
        by = b[1],
        bz = b[2],
        bw = b[3];

    out[0] = ax * bw + aw * bx + ay * bz - az * by;
    out[1] = ay * bw + aw * by + az * bx - ax * bz;
    out[2] = az * bw + aw * bz + ax * by - ay * bx;
    out[3] = aw * bw - ax * bx - ay * by - az * bz;
    return out;
};

/**
 * Alias for {@link quat.multiply}
 * @function
 */
quat.mul = quat.multiply;

/**
 * Scales a quat by a scalar number
 *
 * @param {quat} out the receiving vector
 * @param {quat} a the vector to scale
 * @param {Number} b amount to scale the vector by
 * @returns {quat} out
 * @function
 */
quat.scale = vec4.scale;

/**
 * Rotates a quaternion by the given angle about the X axis
 *
 * @param {quat} out quat receiving operation result
 * @param {quat} a quat to rotate
 * @param {number} rad angle (in radians) to rotate
 * @returns {quat} out
 */
quat.rotateX = function (out, a, rad) {
    rad *= 0.5;

    var ax = a[0],
        ay = a[1],
        az = a[2],
        aw = a[3],
        bx = Math.sin(rad),
        bw = Math.cos(rad);

    out[0] = ax * bw + aw * bx;
    out[1] = ay * bw + az * bx;
    out[2] = az * bw - ay * bx;
    out[3] = aw * bw - ax * bx;
    return out;
};

/**
 * Rotates a quaternion by the given angle about the Y axis
 *
 * @param {quat} out quat receiving operation result
 * @param {quat} a quat to rotate
 * @param {number} rad angle (in radians) to rotate
 * @returns {quat} out
 */
quat.rotateY = function (out, a, rad) {
    rad *= 0.5;

    var ax = a[0],
        ay = a[1],
        az = a[2],
        aw = a[3],
        by = Math.sin(rad),
        bw = Math.cos(rad);

    out[0] = ax * bw - az * by;
    out[1] = ay * bw + aw * by;
    out[2] = az * bw + ax * by;
    out[3] = aw * bw - ay * by;
    return out;
};

/**
 * Rotates a quaternion by the given angle about the Z axis
 *
 * @param {quat} out quat receiving operation result
 * @param {quat} a quat to rotate
 * @param {number} rad angle (in radians) to rotate
 * @returns {quat} out
 */
quat.rotateZ = function (out, a, rad) {
    rad *= 0.5;

    var ax = a[0],
        ay = a[1],
        az = a[2],
        aw = a[3],
        bz = Math.sin(rad),
        bw = Math.cos(rad);

    out[0] = ax * bw + ay * bz;
    out[1] = ay * bw - ax * bz;
    out[2] = az * bw + aw * bz;
    out[3] = aw * bw - az * bz;
    return out;
};

/**
 * Calculates the W component of a quat from the X, Y, and Z components.
 * Assumes that quaternion is 1 unit in length.
 * Any existing W component will be ignored.
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a quat to calculate W component of
 * @returns {quat} out
 */
quat.calculateW = function (out, a) {
    var x = a[0],
        y = a[1],
        z = a[2];

    out[0] = x;
    out[1] = y;
    out[2] = z;
    out[3] = Math.sqrt(Math.abs(1.0 - x * x - y * y - z * z));
    return out;
};

/**
 * Calculates the dot product of two quat's
 *
 * @param {quat} a the first operand
 * @param {quat} b the second operand
 * @returns {Number} dot product of a and b
 * @function
 */
quat.dot = vec4.dot;

/**
 * Performs a linear interpolation between two quat's
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a the first operand
 * @param {quat} b the second operand
 * @param {Number} t interpolation amount between the two inputs
 * @returns {quat} out
 * @function
 */
quat.lerp = vec4.lerp;

/**
 * Performs a spherical linear interpolation between two quat
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a the first operand
 * @param {quat} b the second operand
 * @param {Number} t interpolation amount between the two inputs
 * @returns {quat} out
 */
quat.slerp = function (out, a, b, t) {
    // benchmarks:
    //    http://jsperf.com/quaternion-slerp-implementations

    var ax = a[0],
        ay = a[1],
        az = a[2],
        aw = a[3],
        bx = b[0],
        by = b[1],
        bz = b[2],
        bw = b[3];

    var omega, cosom, sinom, scale0, scale1;

    // calc cosine
    cosom = ax * bx + ay * by + az * bz + aw * bw;
    // adjust signs (if necessary)
    if (cosom < 0.0) {
        cosom = -cosom;
        bx = -bx;
        by = -by;
        bz = -bz;
        bw = -bw;
    }
    // calculate coefficients
    if (1.0 - cosom > 0.000001) {
        // standard case (slerp)
        omega = Math.acos(cosom);
        sinom = Math.sin(omega);
        scale0 = Math.sin((1.0 - t) * omega) / sinom;
        scale1 = Math.sin(t * omega) / sinom;
    } else {
        // "from" and "to" quaternions are very close
        //  ... so we can do a linear interpolation
        scale0 = 1.0 - t;
        scale1 = t;
    }
    // calculate final values
    out[0] = scale0 * ax + scale1 * bx;
    out[1] = scale0 * ay + scale1 * by;
    out[2] = scale0 * az + scale1 * bz;
    out[3] = scale0 * aw + scale1 * bw;

    return out;
};

/**
 * Performs a spherical linear interpolation with two control points
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a the first operand
 * @param {quat} b the second operand
 * @param {quat} c the third operand
 * @param {quat} d the fourth operand
 * @param {Number} t interpolation amount
 * @returns {quat} out
 */
quat.sqlerp = function () {
    var temp1 = quat.create();
    var temp2 = quat.create();

    return function (out, a, b, c, d, t) {
        quat.slerp(temp1, a, d, t);
        quat.slerp(temp2, b, c, t);
        quat.slerp(out, temp1, temp2, 2 * t * (1 - t));

        return out;
    };
}();

/**
 * Calculates the inverse of a quat
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a quat to calculate inverse of
 * @returns {quat} out
 */
quat.invert = function (out, a) {
    var a0 = a[0],
        a1 = a[1],
        a2 = a[2],
        a3 = a[3],
        dot = a0 * a0 + a1 * a1 + a2 * a2 + a3 * a3,
        invDot = dot ? 1.0 / dot : 0;

    // TODO: Would be faster to return [0,0,0,0] immediately if dot == 0

    out[0] = -a0 * invDot;
    out[1] = -a1 * invDot;
    out[2] = -a2 * invDot;
    out[3] = a3 * invDot;
    return out;
};

/**
 * Calculates the conjugate of a quat
 * If the quaternion is normalized, this function is faster than quat.inverse and produces the same result.
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a quat to calculate conjugate of
 * @returns {quat} out
 */
quat.conjugate = function (out, a) {
    out[0] = -a[0];
    out[1] = -a[1];
    out[2] = -a[2];
    out[3] = a[3];
    return out;
};

/**
 * Calculates the length of a quat
 *
 * @param {quat} a vector to calculate length of
 * @returns {Number} length of a
 * @function
 */
quat.length = vec4.length;

/**
 * Alias for {@link quat.length}
 * @function
 */
quat.len = quat.length;

/**
 * Calculates the squared length of a quat
 *
 * @param {quat} a vector to calculate squared length of
 * @returns {Number} squared length of a
 * @function
 */
quat.squaredLength = vec4.squaredLength;

/**
 * Alias for {@link quat.squaredLength}
 * @function
 */
quat.sqrLen = quat.squaredLength;

/**
 * Normalize a quat
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a quaternion to normalize
 * @returns {quat} out
 * @function
 */
quat.normalize = vec4.normalize;

/**
 * Creates a quaternion from the given 3x3 rotation matrix.
 *
 * NOTE: The resultant quaternion is not normalized, so you should be sure
 * to renormalize the quaternion yourself where necessary.
 *
 * @param {quat} out the receiving quaternion
 * @param {mat3} m rotation matrix
 * @returns {quat} out
 * @function
 */
quat.fromMat3 = function (out, m) {
    // Algorithm in Ken Shoemake's article in 1987 SIGGRAPH course notes
    // article "Quaternion Calculus and Fast Animation".
    var fTrace = m[0] + m[4] + m[8];
    var fRoot;

    if (fTrace > 0.0) {
        // |w| > 1/2, may as well choose w > 1/2
        fRoot = Math.sqrt(fTrace + 1.0); // 2w
        out[3] = 0.5 * fRoot;
        fRoot = 0.5 / fRoot; // 1/(4w)
        out[0] = (m[5] - m[7]) * fRoot;
        out[1] = (m[6] - m[2]) * fRoot;
        out[2] = (m[1] - m[3]) * fRoot;
    } else {
        // |w| <= 1/2
        var i = 0;
        if (m[4] > m[0]) i = 1;
        if (m[8] > m[i * 3 + i]) i = 2;
        var j = (i + 1) % 3;
        var k = (i + 2) % 3;

        fRoot = Math.sqrt(m[i * 3 + i] - m[j * 3 + j] - m[k * 3 + k] + 1.0);
        out[i] = 0.5 * fRoot;
        fRoot = 0.5 / fRoot;
        out[3] = (m[j * 3 + k] - m[k * 3 + j]) * fRoot;
        out[j] = (m[j * 3 + i] + m[i * 3 + j]) * fRoot;
        out[k] = (m[k * 3 + i] + m[i * 3 + k]) * fRoot;
    }

    return out;
};

/**
 * Returns a string representation of a quatenion
 *
 * @param {quat} a vector to represent as a string
 * @returns {String} string representation of the vector
 */
quat.str = function (a) {
    return 'quat(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' + a[3] + ')';
};

/**
 * Returns whether or not the quaternions have exactly the same elements in the same position (when compared with ===)
 *
 * @param {quat} a The first quaternion.
 * @param {quat} b The second quaternion.
 * @returns {Boolean} True if the vectors are equal, false otherwise.
 */
quat.exactEquals = vec4.exactEquals;

/**
 * Returns whether or not the quaternions have approximately the same elements in the same position.
 *
 * @param {quat} a The first vector.
 * @param {quat} b The second vector.
 * @returns {Boolean} True if the vectors are equal, false otherwise.
 */
quat.equals = vec4.equals;

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

/**
 * Builds the base items needed in any Camera
 * @returns {*}
 * @constructor
 */
function BuildCameraBase() {
    // projection matrix.
    var proj = mat4.create();

    // view matrix
    var view = mat4.create();

    // inverse of the view matrix
    var inverseView = mat4.create();

    // camera position
    var pos = vec3.create(0, 0, 0);

    // camera direction
    var direction = vec3.create(0, 0, -1);

    // orientation
    var orientation = mat4.create();

    // up
    var up = vec3.create(0, 1, 0);

    // center
    var center = vec3.create();

    // eye
    var eye = vec3.create();

    return {
        type: "camera",
        position: pos,
        projection: proj,
        view: view,
        inverseView: inverseView,
        eye: eye,
        center: center,
        up: up,
        zoom: 0,
        target: [0, 0, 0],
        direction: direction,
        lookAt: function lookAt(eye) {
            var aCenter = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

            this.eye = vec3.clone(eye);
            this.center = aCenter !== null ? vec3.clone(aCenter) : this.center;

            vec3.copy(this.position, eye);
            mat4.identity(this.view);
            mat4.lookAt(this.view, eye, this.center, this.up);
        },

        /**
         * Updates camera position
         * @param position {Array} position vector
         * @param direction {Array} direction vector
         * @param up {Array} up vector (note that it's unlikely this will change often)
         */
        update: function update(position, direction, up) {
            this.up = up;
            this.direction = direction;
            this.lookAt(position);
        },
        translate: function translate() {
            var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
            var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
            var z = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
        },
        setProjection: function setProjection(mProj) {
            this.projection = mat4.clone(mProj);
        },
        setView: function setView(mView) {
            this.view = mat4.clone(mView);
        },
        getProjection: function getProjection() {
            return this.projection;
        },
        getView: function getView() {
            return this.view;
        },
        getInverseView: function getInverseView() {
            mat4.identity(this.inverseView);
            return mat4.invert(this.inverseView, this.view);
        }
    };
}

function fullscreenAspectRatio() {
    return window.innerWidth / window.innerHeight;
}

/**
 * Constructs the base for a perspective camera
 * @param fov {Number} field of view
 * @param aspect {Number} aspect ratio
 * @param near {Number} near value
 * @param far {Number} far value
 * @returns {{position, projection, view, proj, eye, center, up, lookAt, setProjection, setView}|*}
 * @constructor
 */
function PerspectiveCamera(fov, aspect, near, far) {
    var camera = BuildCameraBase();
    camera.lookAt([0, 0, 0]);
    camera.fov = fov;
    camera.near = near;
    camera.far = far;
    mat4.perspective(camera.projection, fov, aspect, near, far);

    // initial translation, just so we can ensure something shows up and no one thinks something's weird.
    mat4.translate(camera.view, camera.view, [0, 0, -10]);
    return camera;
}

function orbitTarget(camera, angle) {
    mat4.rotateY(camera.view, camera.view, toRadians(angle));

    return camera;
}



/**
 * Function to set camera zoom.
 * @param camera a camera object. The type property will get checked for the type "camera"
 * @param zoom the zoom level
 * @returns {*}
 */
function setZoom(camera, zoom) {
    if (camera.hasOwnProperty("type") && camera.type === "camera") {
        camera.zoom = zoom;
        camera.position = [0, 0, zoom];
        camera.lookAt([0, 0, 0]);
        mat4.translate(camera.view, camera.view, [0, 0, zoom]);
    }
    return camera;
}

/**
 * Translates the camera. Assumes that the position is a 3 component vector.
 * @param camera {Object} a camera object. The type property will get checked for the type "camera"
 * @param position {Array} an array for the new position. assumed to be 3 component array at the most.
 */


function updateProjection(camera) {
    var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        _ref$aspect = _ref.aspect,
        aspect = _ref$aspect === undefined ? window.innerWidth / window.innerHeight : _ref$aspect,
        _ref$near = _ref.near,
        near = _ref$near === undefined ? camera.near : _ref$near,
        _ref$far = _ref.far,
        far = _ref$far === undefined ? camera.far : _ref$far,
        _ref$fov = _ref.fov,
        fov = _ref$fov === undefined ? camera.fov : _ref$fov;

    mat4.perspective(camera.projection, fov, aspect, near, far);
    return camera;
}

/**
 * Creates a depth texture for an FBO.
 * @param gl
 * @param width
 * @param height
 */


/**
 * A stand alone function for creating data based textures with TypedArrays.
 * Usable on it's own, but recommended that you use the {@link createTexture2d}
 * function
 * @param gl {WebGLRenderingContext} a WebGLRenderingContext
 * @param data {TypedArray} a TypedArray of data you want to write onto the texture
 * @param options {Object} a map of options for the texture creation. Needs the following keys
 * - width
 * - height
 * - internalFormat (gl.RGBA, etc)
 * - format (in WebGL 1, this should be the same as internalFormat, may change in WebGL2)
 * - type (gl.FLOAT, etc)
 * @returns {*}
 */
function createDataTexture(gl, data, options) {
    var texture = gl.createTexture();

    gl.bindTexture(TEXTURE_2D, texture);
    gl.texImage2D(TEXTURE_2D, 0, options.internalFormat, options.width, options.height, 0, options.format, options.type, data);

    // set min and mag filters
    gl.texParameteri(TEXTURE_2D, MAG_FILTER, options.magFilter);
    gl.texParameteri(TEXTURE_2D, MIN_FILTER, options.minFilter);

    //set wrapping
    gl.texParameteri(TEXTURE_2D, WRAP_S, options.wrapS);
    gl.texParameteri(TEXTURE_2D, WRAP_T, options.wrapT);

    // generate mipmaps if necessary
    if (options.generateMipMaps) {
        gl.generateMipmap(TEXTURE_2D);
    }

    gl.bindTexture(TEXTURE_2D, null);

    return texture;
}

/**
 * builds a Cubemap from a dds image file. Partially adapted from
 * @yiwenl's GLCubeTexture.js
 *
 * @param gl {WebGLRenderingContext} a webgl rendering context.
 * @param ddssource {Array} the source array containing the data from the dds file. Assumes
 * file was loaded using Imageloader::loadDDS
 * @param textureFormat {Object} Object containing texture format information created from createTextureFormat
 */
function createCubemapFromDDS(gl, ddssource, textureFormat) {
    var targets = [gl.TEXTURE_CUBE_MAP_POSITIVE_X, gl.TEXTURE_CUBE_MAP_NEGATIVE_X, gl.TEXTURE_CUBE_MAP_POSITIVE_Y, gl.TEXTURE_CUBE_MAP_NEGATIVE_Y, gl.TEXTURE_CUBE_MAP_POSITIVE_Z, gl.TEXTURE_CUBE_MAP_NEGATIVE_Z];

    if (textureFormat === undefined) {
        textureFormat = createTextureFormat({
            format: gl.RGBA,
            internalFormat: gl.RGBA16F,
            texelType: gl.FLOAT
        });
    }

    // there are mips, so adjust filtering
    textureFormat.minFilter = gl.LINEAR_MIPMAP_LINEAR;
    var numLevels = 1;
    var index = 0;
    numLevels = ddssource.length / 6;

    var texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_CUBE_MAP, texture);

    for (var j = 0; j < 6; j++) {
        for (var i = 0; i < numLevels; i++) {
            gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);

            index = j * numLevels + i;

            if (ddssource[index].shape) {
                gl.texImage2D(targets[j], i, textureFormat.internalFormat, ddssource[index].shape[0], ddssource[index].shape[1], 0, textureFormat.format, textureFormat.texelType, ddssource[index].data);
            } else {
                gl.texImage2D(targets[j], i, textureFormat.format, textureFormat.internalFormat, textureFormat.texelType, ddssource[index]);
            }

            gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_S, textureFormat.wrapS);
            gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_T, textureFormat.wrapT);
            gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MAG_FILTER, textureFormat.magFilter);
            gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MIN_FILTER, textureFormat.minFilter);
        }
    }
    gl.bindTexture(gl.TEXTURE_CUBE_MAP, null);

    return {
        raw: texture,
        bind: function bind() {
            var index = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

            gl.activeTexture(TEXTURE0 + index);
            gl.bindTexture(gl.TEXTURE_CUBE_MAP, this.raw);
        },
        unbind: function unbind() {
            gl.bindTexture(gl.TEXTURE_CUBE_MAP, null);
        }
    };
}

/**
 * Creates a CubeMap from a set of images
 * @param gl {WebGLRenderingContext} a WebGl context
 * @param images {Array} array of 6 images that will make up the CubeMap
 * @returns {*}
 */
function createCubemap(gl, images, textureFormat) {
    var targets = [gl.TEXTURE_CUBE_MAP_POSITIVE_X, gl.TEXTURE_CUBE_MAP_NEGATIVE_X, gl.TEXTURE_CUBE_MAP_POSITIVE_Y, gl.TEXTURE_CUBE_MAP_NEGATIVE_Y, gl.TEXTURE_CUBE_MAP_POSITIVE_Z, gl.TEXTURE_CUBE_MAP_NEGATIVE_Z];

    if (images.length < 6) {
        logError("createCubemap error - not enough images to form cubemap", true);
        return;
    }

    if (textureFormat === undefined) {
        textureFormat = createTextureFormat();
    }

    var texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_CUBE_MAP, texture);

    for (var j = 0; j < 6; j++) {
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
        if (images[j].shape) {
            gl.texImage2D(targets[j], 0, textureFormat.format, images[j].shape.width, images[j].shape.height, 0, textureFormat.format, textureFormat.texelType, images[j].data);
        } else {
            gl.texImage2D(targets[j], 0, textureFormat.format, textureFormat.format, textureFormat.texelType, images[j]);
        }
        gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_S, textureFormat.wrapS);
        gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_T, textureFormat.wrapT);
        gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MAG_FILTER, textureFormat.magFilter);
        gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MIN_FILTER, textureFormat.minFilter);
    }
    gl.bindTexture(gl.TEXTURE_CUBE_MAP, null);
    return {
        raw: texture,
        bind: function bind() {
            var index = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

            gl.activeTexture(TEXTURE0 + index);
            gl.bindTexture(gl.TEXTURE_CUBE_MAP, this.raw);
        },
        unbind: function unbind() {
            gl.bindTexture(gl.TEXTURE_CUBE_MAP, null);
        }
    };
}

/**
 * Create an image based texture. Usable on it's own, but recommended that you use the {@link createTexture2d}
 * function
 * @param gl {WebGLRenderingContext} a WebGLRenderingContext
 * @param image {Image} and image object
 * @param options {Object} a map of options for the texture creation
 * @returns {*}
 */
function createImageTexture(gl, image, options) {
    var texture = gl.createTexture();
    gl.bindTexture(TEXTURE_2D, texture);

    // set the image
    gl.texImage2D(TEXTURE_2D, 0, options.format, options.format, options.type, image);

    // set min and mag filters
    gl.texParameteri(TEXTURE_2D, MAG_FILTER, options.magFilter);
    gl.texParameteri(TEXTURE_2D, MIN_FILTER, options.minFilter);

    //set wrapping
    gl.texParameteri(TEXTURE_2D, WRAP_S, options.wrapS);
    gl.texParameteri(TEXTURE_2D, WRAP_T, options.wrapT);

    // generate mipmaps if necessary
    if (options.generateMipMaps) {
        gl.generateMipmap(TEXTURE_2D);
    }

    gl.bindTexture(TEXTURE_2D, null);

    return texture;
}

/**
 * Ensures that the specified width/height for the texture doesn't exceed the max for the
 * current card
 * @param gl {WebGLRenderingContext} a WebGL context
 * @param width {Number} the width
 * @param height {Number} the height
 * @returns {boolean}
 */
function checkTextureSize(gl, width, height) {
    var maxTextureSize = gl.getParameter(gl.MAX_TEXTURE_SIZE);
    if (width < 0 || width > maxTextureSize || height < 0 || height > maxTextureSize) {
        logError('Invalid texture shape specified', true);
        return false;
    } else {
        return true;
    }
}
// =================== MAIN FUNCTIONS ===================== //

/**
 * Creates an object of texture settings that can be used in the creation of a texture.
 * @param options
 * @returns {{format: *, internalFormat: *, type: *, wrapS: *, wrapT: *, minFilter: *, magFilter: *, generateMipMaps: boolean}}
 */
function createTextureFormat() {
    var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref2$format = _ref2.format,
        format = _ref2$format === undefined ? RGBA : _ref2$format,
        _ref2$internalFormat = _ref2.internalFormat,
        internalFormat = _ref2$internalFormat === undefined ? RGBA : _ref2$internalFormat,
        _ref2$type = _ref2.type,
        type = _ref2$type === undefined ? UNSIGNED_BYTE : _ref2$type,
        _ref2$texelType = _ref2.texelType,
        texelType = _ref2$texelType === undefined ? UNSIGNED_BYTE : _ref2$texelType,
        _ref2$wrapS = _ref2.wrapS,
        wrapS = _ref2$wrapS === undefined ? CLAMP_TO_EDGE : _ref2$wrapS,
        _ref2$wrapT = _ref2.wrapT,
        wrapT = _ref2$wrapT === undefined ? CLAMP_TO_EDGE : _ref2$wrapT,
        _ref2$minFilter = _ref2.minFilter,
        minFilter = _ref2$minFilter === undefined ? LINEAR : _ref2$minFilter,
        _ref2$magFilter = _ref2.magFilter,
        magFilter = _ref2$magFilter === undefined ? LINEAR : _ref2$magFilter,
        _ref2$generateMipMaps = _ref2.generateMipMaps,
        generateMipMaps = _ref2$generateMipMaps === undefined ? false : _ref2$generateMipMaps,
        _ref2$depth = _ref2.depth,
        depth = _ref2$depth === undefined ? false : _ref2$depth;

    if (depth !== false) {
        depth = gl.DEPTH_COMPONENT;
    }

    // NOTES
    // 1. in WebGL 1 , internalFormat and format ought to be the same value. TODO does this change in WebGL2?
    // 2. UNSIGNED_BYTE corresponds to a Uint8Array, float corresponds to a Float32Array
    var tformat = {
        format: format,
        internalFormat: internalFormat,
        type: type,
        wrapS: wrapS,
        wrapT: wrapT,
        texelType: texelType,
        minFilter: minFilter,
        magFilter: magFilter,
        generateMipMaps: generateMipMaps,
        depth: depth
    };

    return tformat;
}

/**
 * Simple function for creating a basic texture
 * @param gl {WebGLRenderingContext} a WebGL context
 * @param data {Object} the initial texture data to use. Can be a TypedArray or an image.
 * @param textureFormat {Object} any options for how to process the resulting texture. Will call createTextureFormat by default if null.
 * @param width {Number} The width of the texture
 * @param height {Number} The height of the texture
 * @param randomInit {Boolean} a flag indicating whether or not we want random information written to the texture.
 * Useful for things like GPU ping-pong. False by default.
 * @returns {*}
 */
function createTexture2d(gl) {
    var _ref3 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        data = _ref3.data,
        _ref3$textureFormat = _ref3.textureFormat,
        textureFormat = _ref3$textureFormat === undefined ? null : _ref3$textureFormat,
        _ref3$width = _ref3.width,
        width = _ref3$width === undefined ? 128 : _ref3$width,
        _ref3$height = _ref3.height,
        height = _ref3$height === undefined ? 128 : _ref3$height,
        _ref3$randomInit = _ref3.randomInit,
        randomInit = _ref3$randomInit === undefined ? false : _ref3$randomInit;

    var texture = null;

    // if texture format is not specified, generate default format
    var textureSettings = textureFormat;
    if (textureSettings === null) {
        textureSettings = createTextureFormat();
    }

    // if we have data, process it as such, otherwise generate a blank texture of random data
    if (data === undefined) {
        width = width;
        height = height;

        var _data = null;

        //simplify the above a bit, leaving it for testing.
        if (textureSettings.type === FLOAT) {
            _data = new Float32Array(width * height * 4);
        } else {
            _data = new Uint8Array(width * height * 4);
        }

        // if we just need a smattering of random data, apply that here if the flag is set
        if (randomInit) {
            for (var i = 0; i < width * height * 4; i += 4) {
                _data[i] = Math.random();
                _data[i + 1] = Math.random();
                _data[i + 2] = Math.random();
                _data[i + 3] = 1.0;
            }
        }

        textureSettings["width"] = width;
        textureSettings["height"] = height;
        texture = createDataTexture(gl, _data, textureSettings);

        // if we have data
    } else {
        textureSettings["width"] = width;
        textureSettings["height"] = height;

        // if it's an image, build an image texture
        if (data instanceof Image) {
            texture = createImageTexture(gl, data, textureSettings);
        }

        // if it's a float 32 array we, build a data texture.
        if (data instanceof Float32Array) {
            if (textureSettings.type !== FLOAT) {

                // WebGL2 requires a more specific setting as opposed to just gl.RGBA
                if (gl.isWebGL2) {
                    textureSettings.internalFormat = gl.RGBA32F;
                }
                textureSettings.type = FLOAT;
            }
            texture = createDataTexture(gl, data, textureSettings);
        }

        // if it's a float 32 array we, build a data texture.
        if (data instanceof Uint8Array) {
            if (textureSettings.type !== FLOAT) {
                textureSettings.type = FLOAT;
            }
            texture = createDataTexture(gl, data, textureSettings);
        }

        if (data instanceof Array) {
            if (textureSettings.type !== FLOAT) {
                textureSettings.type = FLOAT;
            }
            texture = createDataTexture(gl, new Float32Array(data), textureSettings);
        }
    }

    return {
        gl: gl,
        texture: texture,
        raw: texture,
        settings: textureSettings,
        name: "Texture",
        getTexture: function getTexture() {
            return this.texture;
        },


        /**
         * Resizes a texture
         * @param w the new width
         * @param h the new height
         */
        resize: function resize(w, h) {
            var options = this.settings;
            if (checkTextureSize(this.gl, w, h)) {
                this.bind();
                gl.texImage2D(TEXTURE_2D, 0, options.internalFormat, options.width, options.height, 0, options.format, options.type, null);
                this.unbind(0);
            }
        },
        bind: function bind() {
            var index = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

            var gl = this.gl;
            gl.activeTexture(TEXTURE0 + index);
            gl.bindTexture(gl.TEXTURE_2D, this.texture);

            this.isBound = true;
        },
        unbind: function unbind() {
            gl.bindTexture(gl.TEXTURE_2D, null);
        }
    };
}

/**
 * Simple function to create a VBO aka buffer
 * @param gl a WebGLRendering context
 * @param data the information for the buffer. If it's a regular array, it'll be turned into a TypedArray
 * @param indexed the type this buffer should be. By default, it's an ARRAY_BUFFER, pass in true for indexed if you're holding indices
 * @param usage the usage for the buffer. by default it's STATIC_DRAW
 */
function createVBO(gl) {
    var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        _ref$data = _ref.data,
        data = _ref$data === undefined ? null : _ref$data,
        _ref$indexed = _ref.indexed,
        indexed = _ref$indexed === undefined ? false : _ref$indexed,
        _ref$usage = _ref.usage,
        usage = _ref$usage === undefined ? "STATIC_DRAW" : _ref$usage;

    var buffer = null;

    // set the buffer type
    var bufferType = "ARRAY_BUFFER";
    if (indexed === true) {
        bufferType = "ELEMENT_ARRAY_BUFFER";
    }
    var name = bufferType;
    bufferType = gl[bufferType];

    // set the usage
    usage = gl[usage];
    buffer = gl.createBuffer();

    var obj = {
        gl: gl,
        buffer: buffer,
        bufferTypeName: name,
        type: bufferType,
        usage: usage,

        raw: function raw() {
            return this.buffer;
        },

        /**
         * Updates the buffer with new information
         * @param data a array of some kind containing your new data
         */
        updateBuffer: function updateBuffer(data) {
            if (data instanceof Array) {
                if (this.bufferTypeName === "ARRAY_BUFFER") {
                    data = new Float32Array(data);
                } else {
                    data = new Uint16Array(data);
                }
            }
            this.bind();
            this.gl.bufferSubData(this.type, 0, data);
            this.unbind();
        },


        /**
         * Alternate function to fill buffer with data
         * @param data
         */
        fill: function fill(data, usage) {
            usage = usage !== undefined ? usage : this.gl.STATIC_DRAW;
            if (data instanceof Array) {
                if (this.bufferTypeName === "ARRAY_BUFFER") {
                    data = new Float32Array(data);
                } else {
                    data = new Uint16Array(data);
                }
            }
            this.bind();
            this.gl.bufferData(this.type, data, usage);
            this.unbind();
            this.data = data;
        },


        /**
         * Sets data onto the vbo.
         * @param data the data for the vbo. Can either be a regular array or a typed array.
         * If a regular array is used, will determine buffer type based on the settings.
         */
        bufferData: function bufferData(data) {
            if (data instanceof Array) {
                if (this.bufferTypeName === "ARRAY_BUFFER") {
                    data = new Float32Array(data);
                } else {
                    data = new Uint16Array(data);
                }
            }
            this.gl.bufferData(this.type, data, usage);
            this.data = data;
        },
        bind: function bind() {
            this.gl.bindBuffer(this.type, this.buffer);
        },
        unbind: function unbind() {
            this.gl.bindBuffer(this.type, null);
        }
    };

    // build out data if passed in as part of the options object
    if (data !== null) {
        obj.bind();
        obj.bufferData(data);
        obj.unbind();
    }

    return obj;
}

/**
 * Creates a VertexAttributeObject aka VAO
 * @param gl a webgl context
 * @param useNative flag for whether or not to use native VAOs (which uses an extension for now)
 */
function createVAO(gl) {
    var useNative = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

    var vao = null;
    var ext = null;
    // TODO support cards that don't have this extension later
    if (useNative) {
        if (gl.isWebGL2) {
            vao = gl.createVertexArray();
        } else {
            if (gl.hasOwnProperty('OES_vertex_array_object')) {
                ext = gl['OES_vertex_array_object'];
                vao = ext.createVertexArrayOES();
            } else {
                ext = gl.getExtension('OES_vertex_array_object');
                vao = ext.createVertexArrayOES();
            }
        }
    }

    return {
        gl: gl,
        vao: vao,
        ext: ext,
        attributes: {},

        /**
         * Helper function to allow an attribute to become instanced.
         * For the time being until WebGL 2 is standardized, this is currently enabled as an
         * extension.
         * @param attribute {String} the name of the attribute to make instanced.
         * @returns {boolean} false if unable to utilize ANGLE_instanced_arrays.
         */
        makeInstancedAttribute: function makeInstancedAttribute(attribute) {
            if (gl.vertexAttribDivisor === null || gl.vertexAttribDivisor === undefined) {
                var _ext = null;
                if (gl.hasOwnProperty('ANGLE_instanced_arrays')) {
                    _ext = gl.ANGLE_instanced_arrays;
                } else {
                    try {
                        _ext = gl.getExtension('ANGLE_instanced_arrays');
                    } catch (e) {
                        console.error("cannot utilize instanced attributes on this GPU");
                        return false;
                    }
                }

                _ext.vertexAttribDivisorANGLE(this.getAttribute(attribute), 1);
            } else {
                gl.vertexAttribDivisor(this.getAttribute(attribute), 1);
            }
        },

        /**
         * Sets an attribute's location
         * @param shader {WebGLProgram} a WebGl shader program to associate with the attribute location
         * @param name {String} the name of the attribute
         * @param index {Number} an optional index. If null, will utilize the automatically assigned location
         * @returns {number} returns the location for the attribute
         */
        setAttributeLocation: function setAttributeLocation(shader, name) {
            var index = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

            var loc = 0;
            var gl = this.gl;

            // if we don't assign an index, get the automatically generated one
            if (index === null || index === undefined) {
                loc = gl.getAttribLocation(shader, name);
            } else {
                loc = gl.bindAttribLocation(shader, index, name);
            }
            return loc;
        },


        /**
         * Enable all of the attributes on a shader onto the VAO.
         * This will automatically set the attribute location to the order in which the
         * attribute was set in the shader settings, but will override that decision if the location index is
         * set in the attribute.
         *
         * @param shader a plane JS object that contains 3 things
         * 1. A WebGLProgram on the key "shader"
         * 2. an array at the key "attributes" that contains the name of all of the attributes we're looking for
         * as well as the size of each attribute.
         */
        enableAttributes: function enableAttributes(shader) {
            var gl = this.gl;
            var attribs = shader.attributes;
            for (var a in attribs) {
                var attrib = attribs[a];
                var attribLoc = this.attributes.length;

                // if the attribute has a location parameter, use that to set the attribute location,
                // otherwise use the next index in the attributes array
                if (attrib.hasOwnProperty('location')) {
                    attribLoc = attrib.location;
                }

                this.addAttribute(shader, attrib.name, attrib.size, attribLoc);
            }
            return this;
        },


        /**
         * Adds an attribute for the VAO to keep track of
         * @param shader {WebGLProgram} the shader that the attribute is a part of. Takes a WebGLProgram but also accepts a plain object created by the
         * {@link createShader} function
         * @param name {String} the name of the attribute to add/enable
         * @param size {Number} optional - the number of items that compose the attribute. For example, for something like, position, you might have xyz components, thus, 3 would be the size
         * @param location {Number} optional - the number to use as the attribute location. If it's not specified, will simply use it's index in the attributes object
         * @param setData {Boolean} optional - flag for whether or not to immediately run setData on the attribute. TODO enable by default
         * @param dataOptions {Object} optional - any options you might want to add when calling setData like an offset or stride value for the data
         * @returns {addAttribute}
         */
        addAttribute: function addAttribute(shader, name) {
            var _ref = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
                _ref$size = _ref.size,
                size = _ref$size === undefined ? 3 : _ref$size,
                location = _ref.location,
                _ref$dataOptions = _ref.dataOptions,
                dataOptions = _ref$dataOptions === undefined ? {} : _ref$dataOptions;

            var attribLoc = this.attributes.length;
            var webglProg = null;

            if (shader instanceof WebGLProgram) {
                webglProg = shader;
            } else {
                webglProg = shader.program;
            }

            // if location is undefined, just set attribute location
            // to be the next index in the attribute set.
            if (location === undefined) {
                attribLoc = location;
            }

            var attribLocation = this.setAttributeLocation(webglProg, name, attribLoc);

            this.attributes[name] = {
                loc: attribLocation,
                enabled: true,
                size: size
            };
            //enable the attribute
            this.enableAttribute(name);

            // if we want to just go ahead and set the data , run that
            this.setData(name, dataOptions);
            return this;
        },


        /**
         * Returns the location of the specified attribute
         * @param name {String} the name of the attribute.
         * @returns {*|number}
         */
        getAttribute: function getAttribute(name) {
            return this.attributes[name].loc;
        },


        /**
         * Alias for vertexAttribPointer function. Useful when the vao is not a part of
         * a larger mesh. Should function exactly  like the normal function but makes some
         * assumptions to help you type less.
         * @param idx {Number} the index to point to
         * @param size {Number} the number of items that make up the vertex (will often times either be 3 or 4)
         * @param type {Number} the type of value it is. It is by default assumed to be a Floating point number
         * @param normalized {Boolean} is the content normalized?
         * @param stride {Number} The stride of the value within the buffer
         * @param offset {Number} The number of places the value is offset in the buffer.
         */
        vertexAttribPointer: function vertexAttribPointer(idx) {
            var _ref2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
                _ref2$size = _ref2.size,
                size = _ref2$size === undefined ? 3 : _ref2$size,
                _ref2$type = _ref2.type,
                type = _ref2$type === undefined ? FLOAT : _ref2$type,
                _ref2$normalized = _ref2.normalized,
                normalized = _ref2$normalized === undefined ? false : _ref2$normalized,
                _ref2$stride = _ref2.stride,
                stride = _ref2$stride === undefined ? 0 : _ref2$stride,
                _ref2$offset = _ref2.offset,
                offset = _ref2$offset === undefined ? 0 : _ref2$offset;

            this.gl.vertexAttribPointer(idx, size, type, normalized, stride, offset);
        },


        /**
         * Enables a vertex attribute
         * @param name {String} the name of the attribute you want to enable
         */
        enableAttribute: function enableAttribute(name) {
            // enable vertex attribute at the location
            if (typeof name === "number") {

                this.gl.enableVertexAttribArray(name);
            } else {
                this.gl.enableVertexAttribArray(this.attributes[name].loc);
            }
        },


        /**
         * Disables a vertex attribute
         * @param name {String} the name of the vertex attribute to disable
         */
        disableAttribute: function disableAttribute(name) {
            if (typeof name === "number") {
                this.gl.disableVertexAttribArray(name);
            } else {
                this.gl.disableVertexAttribArray(this.attributes[name].loc);
            }
        },


        /**
         * Shorthand for calling gl.vertexAttribPointer. Essentially sets the data into the vao for the
         * currently bound buffer. Some settings are assumed, adjust as necessary
         * @param name {String} the name of the attribute to pass data to in the shader
         * @param options {Object} options for utilizing that information
         */
        setData: function setData(name) {
            var _ref3 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
                options = _ref3.options;

            var loc = this.attributes[name].loc;
            var size = this.attributes[name].size;

            var pointerOptions = {
                type: gl.FLOAT,
                normalized: gl.FALSE,
                stride: 0,
                offset: 0
            };
            if (options !== undefined) {
                Object.assign(pointerOptions, options);
            }
            gl.vertexAttribPointer(loc, size, pointerOptions.type, pointerOptions.normalized, pointerOptions.stride, pointerOptions.offset);
        },

        /**
         * Binds the vao
         */
        bind: function bind() {
            if (this.gl.isWebGL2) {
                this.gl.bindVertexArray(this.vao);
            } else {
                ext.bindVertexArrayOES(this.vao);
            }
        },


        /**
         * Unbinds the vao
         */
        unbind: function unbind() {
            if (this.gl.isWebGL2) {
                this.gl.bindVertexArray(null);
            } else {
                ext.bindVertexArrayOES(null);
            }
        }
    };
}

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/**
 * Compiles either a fragment or vertex shader
 * @param gl a webgl context
 * @param type the type of shader. Should be either gl.FRAGMENT_SHADER or gl.VERTEX_SHADER
 * @param source the source (as a string) for the shader
 * @returns {*} returns the compiled shader
 */
function compileShader(gl, type, source) {
    var shader = gl.createShader(type);
    var shaderTypeName = "";

    // get the string name of the type of shader we're trying to compile.
    if (type === gl.FRAGMENT_SHADER) {
        shaderTypeName = "FRAGMENT";
    } else {
        shaderTypeName = "VERTEX";
    }

    gl.shaderSource(shader, source);
    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        logError("Error in " + shaderTypeName + " shader compilation - " + gl.getShaderInfoLog(shader), true);
        return false;
    } else {
        return shader;
    }
}

/**
 * The main function for creating a shader. Shader also manages figuring out
 * attribute and uniform location indices.
 *
 * @param gl a webgl context
 * @param vertex the source for the vertex shader
 * @param fragment the source for the fragment shader
 * @param {Object} transformFeedback an object containing two keys
 * 1. varyings - an array with strings of the varyings variables in the GLSL needed for transform feedback
 * 2. mode - a WebGL constant specifying the type of transform feedback attributes being used, should either be
 * gl.SEPERATE_ATTRIBS or gl.INTERLEAVED_ATTRIBS
 * @returns {*} returns the WebGLProgram compiled from the two shaders
 */
function makeShader(gl, vertex, fragment) {
    var transformFeedback = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;

    var vShader = compileShader(gl, gl.VERTEX_SHADER, vertex);
    var fShader = compileShader(gl, gl.FRAGMENT_SHADER, fragment);

    if (vShader !== false && fShader !== false) {
        var program = gl.createProgram();
        gl.attachShader(program, vShader);
        gl.attachShader(program, fShader);

        // if we're using transform feedback and have WebGL2
        if (gl.isWebGL2) {
            if (transformFeedback !== null) {
                gl.transformFeedbackVaryings(program, transformFeedback.varyings, transformFeedback.mode);
            }
        }

        gl.linkProgram(program);

        // TODO is this really necesary?
        gl.deleteShader(vShader);
        gl.deleteShader(fShader);

        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
            logError("Could not initialize WebGLProgram");
            throw "Couldn't link shader program - " + gl.getProgramInfoLog(program);
            return false;
        } else {
            return program;
        }
    }
}

// ==================== MAIN FUNCTION ====================== //

/**
 * A function to quickly setup a WebGL shader program.
 * Modeled a bit after thi.ng
 * @param gl {WebGLRenderingContext} the WebGL context to use
 * @param spec {Object} a object containing the out line of what the shader would look like.
 * @returns {*} and JS object with the shader information along with some helpful functions
 */
function createShader() {
    var gl = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    var spec = arguments[1];
    var transformFeedback = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

    var vs = null;
    var fs = null;
    var uniforms = {};
    var blockBindings = 0;
    var attributes = {};
    var precision = spec.precision !== undefined ? spec.precision : "highp";
    var version = spec.version !== undefined ? spec.version : "#version 300 es \n";

    if (gl === null) {
        console.error("");
        return false;
    }

    if (!spec.hasOwnProperty("vertex") || !spec.hasOwnProperty("fragment")) {
        logError("spec does not contain vertex and/or fragment shader", true);
        return false;
    }

    // if either of the shader sources are arrays, join source files together into one
    // source. This assumes that the variables in the array refer to source strings and not other objects.
    if (spec.vertex instanceof Array) {
        // by default, prepend version 300 es for WebGL 2.
        if (gl.isWebGL2) {
            spec.vertex.unshift(version);
        }
        spec.vertex = spec.vertex.join("");
    } else {

        // prepend version number for WebGL2
        if (gl.isWebGL2) {
            spec.vertex = version + spec.vertex;
        }
    }

    if (spec.fragment instanceof Array) {
        // by default, prepend version 300 es for WebGL 2.
        if (gl.isWebGL2) {
            spec.fragment.unshift(version);
        }

        spec.fragment = spec.fragment.join("");
    } else {
        if (gl.isWebGL2) {
            spec.fragment = version + spec.fragment;
        }
    }

    // build the shader
    var shader = makeShader(gl, spec.vertex, spec.fragment, transformFeedback);

    // set uniforms and their locations (plus default values if specified)
    if (spec.hasOwnProperty('uniforms')) {

        /**
         * Look through the shader and pre-fetch any uniform location values.
         * If the value is a string, just fetch the location.
         *
         * If the value happens to be an object, try setting the default value,
         * or if the item is an object with the key "buffer", fetch the uniform block index instead.
         *
         * TODO enable setting of default values.
         * @type {Array}
         */
        var uValues = spec.uniforms.map(function (value) {

            if (typeof value === 'string') {

                var loc = gl.getUniformLocation(shader, value);
                uniforms[value] = loc;
            } else if ((typeof value === "undefined" ? "undefined" : _typeof(value)) === 'object') {
                var _loc = null;

                /**
                 * Handle UBOs. UBOS should look like this in the declaration
                 * {
                 *  name:"name",
                 *  buffer:true
                 * }
                 */
                if (value.hasOwnProperty("buffer")) {
                    try {
                        _loc = gl.getUniformBlockIndex(shader, value.name);
                    } catch (e) {
                        logError("Attempt to get UBO location when UBOs are not yet supported by your computer", true);
                    }
                } else {
                    _loc = gl.getUniformLocation(shader, value.name);
                }

                // store uniform location under it's shader name
                uniforms[value.name] = _loc;
            }
        });
    }

    /**
     * Arranges all of the attribute data into neat containers
     * to allow for easy processing by a VAO.
     * Attributes should be specified as arrays
     * @deprecated
     */
    if (spec.hasOwnProperty('attributes')) {
        var attribs = spec.attributes.map(function (value) {

            attributes[value[0]] = {
                size: value[1],
                name: value[0]
            };

            // if a desired uniform location is set ,
            // make sure to reflect that in the information
            if (value[2] !== undefined) {
                attributes[value[0]].location = value[2];
            }
        });
    }

    return {
        gl: gl,
        program: shader,
        uniforms: uniforms,
        attributes: attributes,
        /**
         * Binds the shader for use. You can optionally pass in a object containing
         * the projection and view/modelView matrices and specify the specific uniform names
         * which default to projection and modelViewMatrix. You can also pass in an object for "camera" created
         * by the functions in framework/camera.js
         * @param camera an object containing the projection and view/modelView matrices for the shader
         * @param projection the uniform name for the projection matrix
         * @param view the uniform name for the view/modelView matrix
         */
        bind: function bind() {
            var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
                _ref$camera = _ref.camera,
                camera = _ref$camera === undefined ? null : _ref$camera,
                _ref$projection = _ref.projection,
                projection = _ref$projection === undefined ? "projectionMatrix" : _ref$projection,
                _ref$view = _ref.view,
                view = _ref$view === undefined ? "modelViewMatrix" : _ref$view;

            this.gl.useProgram(this.program);
            if (camera !== null) {
                this.set4x4Uniform(projection, camera.projection);
                this.set4x4Uniform(view, camera.view);
            }
        },


        /**
         * Sets a matrix uniform for a 4x4 matrix
         * @deprecated prepare to remove and switch to something more descriptive for a 4x4 matrix
         * @param name the name of the uniform whose value you want to set.
         */
        setMatrixUniform: function setMatrixUniform(name, value) {
            this.gl.uniformMatrix4fv(this.uniforms[name], false, value);
        },


        /**
         * Sets a mat4 uniform in a shader
         * @param name the name of the uniform
         * @param value the value for the uniform
         */
        set4x4Uniform: function set4x4Uniform(name, value) {
            this.gl.uniformMatrix4fv(this.uniforms[name], false, value);
        },


        /**
         * Sets a mat3 uniform in a shader
         * @param name  the name of the uniform
         * @param value the value of the uniform
         */
        set3x3Uniform: function set3x3Uniform(name, value) {
            this.gl.uniformMatrix3fv(this.uniforms[name], false, value);
        },

        /**
         * Sets the uniform value for a texture.
         * @param value
         */
        setTextureUniform: function setTextureUniform(name, value) {
            this.gl.uniform1i(this.uniforms[name], value);
        },


        /**
         * Returns the uniform location of a shader's uniform
         * @param name  the name of the location you want
         * @returns {*}
         */
        getUniform: function getUniform(name) {
            return this.uniforms[name];
        },


        /**
         * sets a vec2 uniform
         * @param name
         * @param value
         */
        setVec2: function setVec2(name, v1, v2) {
            this.gl.uniform2f(this.uniforms[name], v1, v2);
        },


        /**
         * Sets a vec3 uniform
         * @param name
         * @param value
         */
        setVec3: function setVec3(name, value) {
            this.gl.uniform3fv(this.uniforms[name], value);
        },


        /**
         * General purpose function which sends a uniform to the currently bound shader. Attempts to derive
         * the correct uniform function to use. Should be good for most situations, but still needs work :p
         * @param name {String} name of the uniform
         * @param value {*} the value to send to the uniform
         */
        uniform: function uniform(name, value) {

            /**
             *  "if" statement to properly figure out what uniform function to use.
             *  Assumes all matrix and vector values are in the forms of an Array object.
             *  Currently no great way to differentiate between integers and floating point values
             *  when it comes to non array values.
             *
             *  Currently works with
             *  - 4x4 matrices
             *  - 3x3 matrices
             *  - vec2 arrays represented by a array with just two values
             *  - vec3 arrays represented by an array with just 3 values
             */
            if (value.length !== undefined && value.length === 16) {
                this.set4x4Uniform(name, value);
            } else if (value.length !== undefined && value.length === 3) {
                this.gl.uniform3fv(this.uniforms[name], value);
            } else if (value.length !== undefined && value.length === 2) {
                this.setVec2(name, value[0], value[1]);
            } else if (value.length !== undefined && value.length === 3) {
                this.setVec3(name, value);
            } else {
                this.gl.uniform1f(this.uniforms[name], value);
            }
        }
    };
}

/**
 * Returns an array of common uniform locations that might
 * need to be looked up.
 * @returns {[string,string,string,string]}
 */
function defaultUniforms() {
    return ["projectionMatrix", "modelMatrix", "modelViewMatrix", "normalMatrix", "viewMatrix", "time", "uTime"];
}

//TODO flush out UBO interaction when WebGL2 hits officially

var _createClass$1 = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray$1(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck$1(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * A basic representation of an on screen object.
 * Provides abstracted methods of adding attributes and underlying data as well as
 * provides helper functions for matrix transformations of the model matrix.
 */

var Mesh = function () {
    function Mesh(gl) {
        var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
            _ref$vertex = _ref.vertex,
            vertex = _ref$vertex === undefined ? "" : _ref$vertex,
            _ref$fragment = _ref.fragment,
            fragment = _ref$fragment === undefined ? "" : _ref$fragment,
            _ref$uniforms = _ref.uniforms,
            uniforms = _ref$uniforms === undefined ? [] : _ref$uniforms,
            _ref$mode = _ref.mode,
            mode = _ref$mode === undefined ? "" : _ref$mode;

        _classCallCheck$1(this, Mesh);

        // Vertex Attribute Object for storing mesh properties.
        this.vao = createVAO(gl);

        // store reference to gl context
        this.gl = gl;

        // model matrix for the mesh
        this.model = mat4.create();

        // model view matrix for the mesh
        this.modelView = mat4.create();

        // the current xyz rotation
        this.rotation = {
            x: 0,
            y: 0,
            z: 0
        };

        // the currently stored attributes for the mesh
        this.attributes = {};

        // the number of vertices for the mesh.
        this.numVertices = 3;

        // mat4 for normal matrix
        this.normalMatrix = mat3.create();

        // set the mode for the mesh - by default it's triangles
        this.mode = mode !== "" ? mode : gl.TRIANGLES;

        // for instanced drawing make sure at least 1 instance is set.
        this.setNumInstances();

        // setup the rotation vector.
        this.rotateAxis = vec3.create();
        vec3.set(this.rotateAxis, this.rotation.x, this.rotation.y, this.rotation.z);

        // setup scale vector
        this.scaleSize = vec3.create();

        // setup position vector
        this.position = vec3.create();

        /**
         * If vertex and fragment attributes are set,  build the shader.
         */
        if (vertex !== "" && fragment !== "") {
            this.setShader({
                vertex: vertex,
                fragment: fragment,
                uniforms: uniforms
            });
        }
    }

    /**
     * Sets the shader for the mesh
     * @param vertex {String} the source for the vertex shader.
     * @param fragment {String} the source for the fragment shader.
     * @param uniforms {Array} array of uniform strings to store locations for.
     *
     * Note that vertex and fragment shader parameters can be an array, in which case, the source is joined together
     * in one complete string before building shader.
     */


    _createClass$1(Mesh, [{
        key: 'setShader',
        value: function setShader() {
            var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
                _ref2$vertex = _ref2.vertex,
                vertex = _ref2$vertex === undefined ? "" : _ref2$vertex,
                _ref2$fragment = _ref2.fragment,
                fragment = _ref2$fragment === undefined ? "" : _ref2$fragment,
                _ref2$uniforms = _ref2.uniforms,
                uniforms = _ref2$uniforms === undefined ? [] : _ref2$uniforms;

            var gl = this.gl;

            if (vertex !== "" && fragment !== "") {
                var defaults = defaultUniforms();

                this.shader = createShader(this.gl, {
                    vertex: vertex,
                    fragment: fragment,
                    uniforms: [].concat(_toConsumableArray$1(defaults), _toConsumableArray$1(uniforms))
                });

                this.shaderSet = true;
            }
        }

        /**
         * Adds an attribute to the mesh
         * @param name name of the attribute in the shader
         * @param data data of the attribute. Can be regular or TypedArray
         * @param dataSize the size of each component for the attribute. It's assumed that
         * each component falls in line with the normal xyz schema so it's set to 3.
         * @returns {Mesh}
         */

    }, {
        key: 'addAttribute',
        value: function addAttribute(name, data) {
            var size = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 3;
            var dataOptions = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

            if (this.shaderSet) {

                var gl = this.gl;
                var buffer = createVBO(gl);

                this.vao.bind();
                buffer.bind();

                buffer.bufferData(data);
                this.vao.addAttribute(this.shader, name, {
                    size: size,
                    dataOptions: dataOptions
                });
                buffer.unbind();
                this.vao.unbind();

                // store location in the event of a WebGL error so we
                // can better pinpoint where the issue might lie.
                buffer.location = this.vao.getAttribute(name);

                this.attributes[name] = buffer;

                return this;
            }
        }

        /**
         * Adds an attribute in the form of a pre-built VBO
         * @param name the name of the attribute on the shader
         * @param buffer {Object} a VBO object created using createVBO
         * @returns {Mesh}
         */

    }, {
        key: 'addAttributeBuffer',
        value: function addAttributeBuffer(name, buffer) {
            if (this.shaderSet) {

                var gl = this.gl;
                this.vao.bind();
                buffer.bind();
                this.vao.addAttribute(this.shader, name, {
                    size: size,
                    dataOptions: dataOptions
                });
                buffer.unbind();
                this.vao.unbind();

                this.attributes[name] = buffer;

                return this;
            }
        }
    }, {
        key: 'updateRawBuffer',
        value: function updateRawBuffer(name, buffer) {
            var _ref3 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
                _ref3$size = _ref3.size,
                size = _ref3$size === undefined ? 3 : _ref3$size,
                dataOptions = _ref3.dataOptions;

            var gl = this.gl;
            this.vao.bind();
            gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
            this.vao.addAttribute(this.shader, name, {
                size: size,
                dataOptions: dataOptions
            });
            gl.bindBuffer(gl.ARRAY_BUFFER, null);
            this.vao.unbind();
        }
    }, {
        key: 'addInstancedAttributeBuffer',
        value: function addInstancedAttributeBuffer(name, buffer) {
            var _ref4 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
                _ref4$size = _ref4.size,
                size = _ref4$size === undefined ? 3 : _ref4$size,
                dataOptions = _ref4.dataOptions;

            if (this.shaderSet) {
                var gl = this.gl;
                if (buffer instanceof WebGLBuffer) {

                    this.vao.bind();
                    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
                    this.vao.addAttribute(this.shader, name, {
                        size: size,
                        dataOptions: dataOptions
                    });
                    this.vao.makeInstancedAttribute(name);
                    gl.bindBuffer(gl.ARRAY_BUFFER, null);
                    this.vao.unbind();

                    this.attributes[name] = buffer;
                } else {
                    this.vao.bind();
                    buffer.bind();
                    this.vao.addAttribute(this.shader, name, {
                        size: size,
                        dataOptions: dataOptions
                    });
                    this.vao.makeInstancedAttribute(name);
                    buffer.unbind();
                    this.vao.unbind();

                    this.attributes[name] = buffer;
                }

                return this;
            }
        }

        /**
         * Adds an attribute but also makes it instanced
         * @param name the name of the attribute
         * @param data data for the attribute
         * @returns {Mesh}
         */

    }, {
        key: 'addInstancedAttribute',
        value: function addInstancedAttribute(name, data) {
            var size = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 3;
            var dataOptions = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

            if (this.shaderSet) {

                var gl = this.gl;
                var buffer = createVBO(gl);

                this.vao.bind();
                buffer.bind();

                buffer.bufferData(data);
                this.vao.addAttribute(this.shader, name, {
                    size: size,
                    dataOptions: dataOptions
                });
                this.vao.makeInstancedAttribute(name);
                buffer.unbind();
                this.vao.unbind();

                this.attributes[name] = buffer;

                this.instanced = true;
                return this;
            }
        }

        /**
         * Updates data for an attribute
         * @param name {String} the name of the attribute
         * @param data {Array} the new dataset to use.
         */

    }, {
        key: 'updateAttribute',
        value: function updateAttribute(name, data) {
            var buffer = this.attributes[name];
            this.vao.bind();
            buffer.bind();
            buffer.updateBuffer(data);
            buffer.unbind();
            this.vao.unbind();
        }

        /**
         * Sets the number of vertices to utilize while drawing.
         * This is only for things where you are using gl.drawArrays and may mess things up
         * if you call this on a mesh with indices. This function operates under the assumption that the
         * value you pass in is the total number of items in your position(s) array and not the actual number of vertices.
         * This function divides by a divisor to figure that out
         *
         * @param num the total number of vertices in your mesh. Will divide by 3 automatically
         * as long as the value you input is greater than 10.
         *
         * Sets the numVertices attribute of the mesh which can be used in gl.drawArrays
         * @param divisor {Number} the number used to figure out how many vertices are in a mesh.
         */

    }, {
        key: 'setNumVertices',
        value: function setNumVertices(num) {
            var divisor = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 3;

            if (!this.indicesSet) {

                //TODO it feels like there has to be a better way of doing this and ensuring that we need to divide
                if (num > 10) {
                    num = num / divisor;
                }
                this.numVertices = num;
            }

            return num;
        }

        /**
         * Adds an indices buffer to the mesh. The number of elements to use while drawing is
         * automatically inferred by the data length
         *
         * @param data Data for the indices. Can be a regular or Typed array.
         * @returns {Mesh}
         */

    }, {
        key: 'addIndices',
        value: function addIndices(data) {
            if (this.shaderSet) {
                var gl = this.gl;
                var buffer = createVBO(gl, {
                    indexed: true
                });

                this.vao.bind();
                buffer.bind();
                buffer.bufferData(data);

                this.vao.unbind();
                buffer.unbind();
                this.indicesSet = true;
                this.numVertices = data.length;

                return this;
            }
        }

        /**
         * Sets the number of instances when using instanced attributes
         * @param num
         */

    }, {
        key: 'setNumInstances',
        value: function setNumInstances() {
            var num = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;

            if (this.instanced) {
                this.numInstances = num;
            }
        }

        /**
         * Draws the mesh;
         */

    }, {
        key: 'draw',
        value: function draw(camera, cb) {
            if (this.shaderSet) {
                this.shader.bind();

                // update normal matrix
                this.calculateNormalMatrix(camera.view);

                // bind default uniforms
                this.shader.set4x4Uniform('projectionMatrix', camera.projection);
                this.shader.set4x4Uniform('modelViewMatrix', camera.view);
                this.shader.set3x3Uniform('normalMatrix', this.normalMatrix);

                this.shader.uniform("viewMatrix", camera.view);
                this.shader.uniform("view", camera.view);
                this.shader.uniform("modelMatrix", this.model);
                this.shader.uniform("model", this.model);

                // run callback so user can add any additional uniform values
                if (cb !== undefined) {
                    cb(this.shader);
                }

                // bind vao
                this.vao.bind();

                // if we've set indices, we need to call a different draw function
                if (this.indicesSet && !this.instanced) {
                    this.gl.drawElements(this.mode, this.numVertices, UNSIGNED_SHORT, 0);
                } else if (!this.instanced) {

                    this.gl.drawArrays(this.mode, 0, this.numVertices);
                }

                // if we have instanced attributes
                if (this.indicesSet && this.instanced) {

                    this.gl.drawInstancedElements(this.mode, this.numVertices, this.numInstances);
                } else if (this.instanced) {}

                // unbind vao
                this.vao.unbind();
            }
        }
    }, {
        key: 'drawOrtho',
        value: function drawOrtho(camera, cb) {
            if (this.shaderSet) {
                this.shader.bind();

                // run callback so user can add any additional uniform values
                if (cb !== undefined) {
                    cb(this.shader);
                }

                // bind vao
                this.vao.bind();

                // if we've set indices, we need to call a different draw function
                if (this.indicesSet && !this.instanced) {
                    this.gl.drawElements(this.mode, this.numVertices, UNSIGNED_SHORT, 0);
                } else if (!this.instanced) {
                    this.gl.drawArrays(this.mode, 0, this.numVertices);
                }

                // if we have instanced attributes
                if (this.indicesSet && this.instanced) {
                    this.gl.drawInstancedElements(this.mode, this.numVertices, this.numInstances);
                } else if (this.instanced) {}

                // unbind vao
                this.vao.unbind();
            }
        }
    }, {
        key: 'update',
        value: function update() {}
    }, {
        key: 'translate',
        value: function translate() {
            var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
            var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
            var z = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

            vec3.set(this.position, x, y, z);
            mat4.translate(this.model, this.model, this.position);
        }
    }, {
        key: 'translateX',
        value: function translateX(x) {
            vec3.set(this.position, x, this.position[1], this.position[2]);
            mat4.translate(this.model, this.model, this.position);
        }
    }, {
        key: 'translateY',
        value: function translateY(y) {
            vec3.set(this.position, this.position[0], y, this.position[2]);
            mat4.translate(this.model, this.model, this.position);
        }
    }, {
        key: 'translateZ',
        value: function translateZ(z) {
            vec3.set(this.position, this.position[0], this.position[1], z);

            mat4.translate(this.model, this.model, this.position);
        }

        /**
         * Scales the model matrix
         * @param x {Number} the amount for scaling along the x axis.
         * @param y {Number} the amount for scaling along the y axis.
         * @param z {Number} the amount for scaling along the z axis.
         * @returns {Mesh}
         */

    }, {
        key: 'scaleModel',
        value: function scaleModel() {
            var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
            var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
            var z = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;

            vec3.set(this.scaleSize, x, y, z);
            mat4.scale(this.model, this.model, this.scaleSize);
            return this;
        }

        /**
         * Rotate mesh along X axis
         * @param angle {Number} the angle to rotate by in degrees.
         * @returns {Mesh}
         */

    }, {
        key: 'rotateX',
        value: function rotateX(angle) {
            angle = toRadians(angle);
            mat4.rotateX(this.model, this.model, angle);
            return this;
        }

        /**
         * Rotate mesh along Y axis
         * @param angle {Number} the angle to rotate by in degrees
         * @returns {Mesh}
         */

    }, {
        key: 'rotateY',
        value: function rotateY(angle) {
            angle = toRadians(angle);
            mat4.rotateY(this.model, this.model, angle);
            return this;
        }
    }, {
        key: 'rotateZ',
        value: function rotateZ(angle) {
            angle = toRadians(angle);
            mat4.rotateZ(this.model, this.model, angle);
            return this;
        }

        /**
         * Works the same as scaleModel, but scales model matrix by a vector.
         * @param v {Array} accepts a Array of 3 components specifying xyz scaling
         */

    }, {
        key: 'scale',
        value: function scale(v) {
            if (v instanceof Array && v.length < 4) {
                mat4.scale(this.model, this.model, v);
                this.scaleSize.x = v[0];
                this.scaleSize.y = v[1];
                this.scaleSize.x = v[2];
            }

            return this;
        }

        /**
         * Calculates the normal matrix
         * @param viewMatrix {Array} the view matrix to utilize. Looking for Arrays created with
         * mat4.create but should be able to take regular Arrays with 16 items.
         *
         * Note that any adjustments to the model-view matrix made in the shader won't
         * be taken into account.
         *
         * @returns {mat3|*} the normal matrix for the given values.
         */

    }, {
        key: 'calculateNormalMatrix',
        value: function calculateNormalMatrix(viewMatrix) {
            var model = this.model;
            var normalMatrix = this.normalMatrix;
            var modelView = this.modelView;

            // reset matrices
            mat4.identity(modelView);
            mat3.identity(normalMatrix);

            // calculate model view matrix
            mat4.multiply(modelView, model, viewMatrix);

            // convert model view into mat3
            mat3.fromMat4(normalMatrix, modelView);

            // invert
            mat3.invert(normalMatrix, normalMatrix);

            // transpose
            mat3.transpose(normalMatrix, normalMatrix);

            this.normalMatrix = normalMatrix;

            return normalMatrix;
        }
    }]);

    return Mesh;
}();

var vert = "\nuniform mat4 projectionMatrix;\nuniform mat4 modelMatrix;\nuniform mat4 viewMatrix;\nuniform mat3 normalMatrix;\nuniform float scale;\nin vec3 position;\nin float ids;\nout float vId;\nout mat3 vNormalMatrix;\nout vec3 vE;\nout vec3 vPosition;\nvoid main(){\n    vec4 pos = vec4(position,1.);\n    pos.x *= scale;\n    pos.y *= scale;\n    pos.z *= scale;\n    vec4 mvMatrix = modelMatrix * viewMatrix * vec4(1.);\n    vec3 e = normalize(vec3(mvMatrix * pos));\n    vId = ids;\n    vE = e;\n    vPosition = pos.xyz;\n    vNormalMatrix = normalMatrix;\n    gl_Position = projectionMatrix * viewMatrix * modelMatrix * pos;\n}";

var frag = "\nprecision highp float;\nuniform sampler2D uTex;\nout vec4 glFragColor;\nin mat3 vNormalMatrix;\nin vec3 vE;\nin float vId;\nin vec3 vPosition;\nvoid main(){\n    vec3 x = dFdx(vPosition);\n    vec3 y = dFdy(vPosition);\n    vec3 normal = normalize(cross(x,y));\n    vec3 n = normalize(vNormalMatrix * normal);\n    vec3 r = reflect(vE,n);\n    float m = 2. * sqrt(\n        pow(r.x,2.) +\n        pow(r.y,2.) +\n        pow(r.z + 1.,2.)\n    );\n    vec2 vN = r.xy / m + .5;\n    vec4 tex = texture(uTex,vN);\n    glFragColor = tex;\n}";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// more or less a port of https://github.com/hughsk/icosphere
// but adapted so as not to be reliant on a commonjs module

var Icohedron = function (_Mesh) {
    _inherits(Icohedron, _Mesh);

    function Icohedron(gl) {
        var subdivisions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
        var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {
            vertex: vert,
            fragment: frag,
            uniforms: ['scale']
        };

        _classCallCheck(this, Icohedron);

        var _this = _possibleConstructorReturn(this, (Icohedron.__proto__ || Object.getPrototypeOf(Icohedron)).call(this, gl, options));

        _this.scale = 1.0;

        _this._buildMesh(subdivisions);
        return _this;
    }

    _createClass(Icohedron, [{
        key: '_buildMesh',
        value: function _buildMesh(subdivisions) {

            var positions = [];
            var faces = [];
            var ids = [];
            var t = 0.5 + Math.sqrt(5) / 2;

            positions.push([-1, +t, 0]);
            positions.push([+1, +t, 0]);
            positions.push([-1, -t, 0]);
            positions.push([+1, -t, 0]);

            positions.push([0, -1, +t]);
            positions.push([0, +1, +t]);
            positions.push([0, -1, -t]);
            positions.push([0, +1, -t]);

            positions.push([+t, 0, -1]);
            positions.push([+t, 0, +1]);
            positions.push([-t, 0, -1]);
            positions.push([-t, 0, +1]);

            faces.push([0, 11, 5]);
            faces.push([0, 5, 1]);
            faces.push([0, 1, 7]);
            faces.push([0, 7, 10]);
            faces.push([0, 10, 11]);

            faces.push([1, 5, 9]);
            faces.push([5, 11, 4]);
            faces.push([11, 10, 2]);
            faces.push([10, 7, 6]);
            faces.push([7, 1, 8]);

            faces.push([3, 9, 4]);
            faces.push([3, 4, 2]);
            faces.push([3, 2, 6]);
            faces.push([3, 6, 8]);
            faces.push([3, 8, 9]);

            faces.push([4, 9, 5]);
            faces.push([2, 4, 11]);
            faces.push([6, 2, 10]);
            faces.push([8, 6, 7]);
            faces.push([9, 8, 1]);

            var complex = {
                cells: faces,
                positions: positions
            };

            while (subdivisions-- > 0) {

                complex = this._subdivide(complex);
            }

            positions = complex.positions;

            for (var i = 0; i < positions.length; i++) {

                this._normalize(positions[i]);
            }

            for (var i = 0; i < complex.positions.length; ++i) {
                ids.push(Math.random());
            }

            this.addAttribute('position', flattenArray(complex.positions));
            this.addIndices(flattenArray(complex.cells));
        }
    }, {
        key: '_normalize',
        value: function _normalize(vec) {
            var mag = 0;
            for (var n = 0; n < vec.length; n++) {
                mag += vec[n] * vec[n];
            }
            mag = Math.sqrt(mag);

            // avoid dividing by zero
            if (mag === 0) {
                return Array.apply(null, new Array(vec.length)).map(Number.prototype.valueOf, 0);
            }

            for (var n = 0; n < vec.length; n++) {
                vec[n] /= mag;
            }

            return vec;
        }
    }, {
        key: '_subdivide',
        value: function _subdivide(complex) {
            var positions = complex.positions;
            var cells = complex.cells;

            var newCells = [];
            var newPositions = [];
            var midpoints = {};
            var f = [0, 1, 2];
            var l = 0;

            for (var i = 0; i < cells.length; i++) {
                var cell = cells[i];
                var c0 = cell[0];
                var c1 = cell[1];
                var c2 = cell[2];
                var v0 = positions[c0];
                var v1 = positions[c1];
                var v2 = positions[c2];

                var a = getMidpoint(v0, v1);
                var b = getMidpoint(v1, v2);
                var c = getMidpoint(v2, v0);

                var ai = newPositions.indexOf(a);
                if (ai === -1) ai = l++, newPositions.push(a);
                var bi = newPositions.indexOf(b);
                if (bi === -1) bi = l++, newPositions.push(b);
                var ci = newPositions.indexOf(c);
                if (ci === -1) ci = l++, newPositions.push(c);

                var v0i = newPositions.indexOf(v0);
                if (v0i === -1) v0i = l++, newPositions.push(v0);
                var v1i = newPositions.indexOf(v1);
                if (v1i === -1) v1i = l++, newPositions.push(v1);
                var v2i = newPositions.indexOf(v2);
                if (v2i === -1) v2i = l++, newPositions.push(v2);

                newCells.push([v0i, ai, ci]);
                newCells.push([v1i, bi, ai]);
                newCells.push([v2i, ci, bi]);
                newCells.push([ai, bi, ci]);
            }

            return {
                cells: newCells,
                positions: newPositions
            };

            // reuse midpoint vertices between iterations.
            // Otherwise, there'll be duplicate vertices in the final
            // mesh, resulting in sharp edges.
            function getMidpoint(a, b) {
                var point = midpoint(a, b);
                var pointKey = pointToKey(point);
                var cachedPoint = midpoints[pointKey];
                if (cachedPoint) {
                    return cachedPoint;
                } else {
                    return midpoints[pointKey] = point;
                }
            }

            function pointToKey(point) {
                return point[0].toPrecision(6) + ',' + point[1].toPrecision(6) + ',' + point[2].toPrecision(6);
            }

            function midpoint(a, b) {
                return [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2, (a[2] + b[2]) / 2];
            }
        }
    }]);

    return Icohedron;
}(Mesh);

// adapted parse-dds npm package in es6 module format.
// original here https://github.com/Jam3/parse-dds.
// and here https://github.com/yiwenl/Alfrid/blob/0ae538184ac54eb9ab96e7cd0fc2b26e5e248d31/src/alfrid/GLCubeTexture.js

var DDS_MAGIC = 0x20534444;
var DDSD_MIPMAPCOUNT = 0x20000;
var DDPF_FOURCC = 0x4;

var FOURCC_DXT1 = fourCCToInt32('DXT1');
var FOURCC_DXT3 = fourCCToInt32('DXT3');
var FOURCC_DXT5 = fourCCToInt32('DXT5');
var FOURCC_DX10 = fourCCToInt32('DX10');
var FOURCC_FP32F = 116; // DXGI_FORMAT_R32G32B32A32_FLOAT

var DDSCAPS2_CUBEMAP = 0x200;
var D3D10_RESOURCE_DIMENSION_TEXTURE2D = 3;
var DXGI_FORMAT_R32G32B32A32_FLOAT = 2;

// The header length in 32 bit ints
var headerLengthInt = 31;

// Offsets into the header array
var off_magic = 0;
var off_size = 1;
var off_flags = 2;
var off_height = 3;
var off_width = 4;
var off_mipmapCount = 7;
var off_pfFlags = 20;
var off_pfFourCC = 21;
var off_caps2 = 28;

function parseHeaders(arrayBuffer) {
    var header = new Int32Array(arrayBuffer, 0, headerLengthInt);

    if (header[off_magic] !== DDS_MAGIC) {
        throw new Error('Invalid magic number in DDS header');
    }

    if (!header[off_pfFlags] & DDPF_FOURCC) {
        throw new Error('Unsupported format, must contain a FourCC code');
    }

    var blockBytes;
    var format;
    var fourCC = header[off_pfFourCC];
    switch (fourCC) {
        case FOURCC_DXT1:
            blockBytes = 8;
            format = 'dxt1';
            break;
        case FOURCC_DXT3:
            blockBytes = 16;
            format = 'dxt3';
            break;
        case FOURCC_DXT5:
            blockBytes = 16;
            format = 'dxt5';
            break;
        case FOURCC_FP32F:
            format = 'rgba32f';
            break;
        case FOURCC_DX10:
            var dx10Header = new Uint32Array(arrayBuffer.slice(128, 128 + 20));
            format = dx10Header[0];
            var resourceDimension = dx10Header[1];
            var miscFlag = dx10Header[2];
            var arraySize = dx10Header[3];
            var miscFlags2 = dx10Header[4];

            if (resourceDimension === D3D10_RESOURCE_DIMENSION_TEXTURE2D && format === DXGI_FORMAT_R32G32B32A32_FLOAT) {
                format = 'rgba32f';
            } else {
                throw new Error('Unsupported DX10 texture format ' + format);
            }
            break;
        default:
            throw new Error('Unsupported FourCC code: ' + int32ToFourCC(fourCC));
    }

    var flags = header[off_flags];
    var mipmapCount = 1;

    if (flags & DDSD_MIPMAPCOUNT) {
        mipmapCount = Math.max(1, header[off_mipmapCount]);
    }

    var cubemap = false;
    var caps2 = header[off_caps2];
    if (caps2 & DDSCAPS2_CUBEMAP) {
        cubemap = true;
    }

    var width = header[off_width];
    var height = header[off_height];
    var dataOffset = header[off_size] + 4;
    var texWidth = width;
    var texHeight = height;
    var images = [];
    var dataLength;

    if (fourCC === FOURCC_DX10) {
        dataOffset += 20;
    }

    if (cubemap) {
        for (var f = 0; f < 6; f++) {
            if (format !== 'rgba32f') {
                throw new Error('Only RGBA32f cubemaps are supported');
            }
            var bpp = 4 * 32 / 8;

            width = texWidth;
            height = texHeight;

            // cubemap should have all mipmap levels defined
            // Math.log2(width) + 1
            var requiredMipLevels = Math.log(width) / Math.log(2) + 1;

            for (var i = 0; i < requiredMipLevels; i++) {
                dataLength = width * height * bpp;
                images.push({
                    offset: dataOffset,
                    length: dataLength,
                    shape: [width, height]
                });
                // Reuse data from the previous level if we are beyond mipmapCount
                // This is hack for CMFT not publishing full mipmap chain https://github.com/dariomanesku/cmft/issues/10
                if (i < mipmapCount) {
                    dataOffset += dataLength;
                }
                width = Math.floor(width / 2);
                height = Math.floor(height / 2);
            }
        }
    } else {
        for (var i = 0; i < mipmapCount; i++) {
            dataLength = Math.max(4, width) / 4 * Math.max(4, height) / 4 * blockBytes;

            images.push({
                offset: dataOffset,
                length: dataLength,
                shape: [width, height]
            });
            dataOffset += dataLength;
            width = Math.floor(width / 2);
            height = Math.floor(height / 2);
        }
    }

    return {
        shape: [texWidth, texHeight],
        images: images,
        format: format,
        flags: flags,
        cubemap: cubemap
    };
}

function fourCCToInt32(value) {
    return value.charCodeAt(0) + (value.charCodeAt(1) << 8) + (value.charCodeAt(2) << 16) + (value.charCodeAt(3) << 24);
}

function int32ToFourCC(value) {
    return String.fromCharCode(value & 0xff, value >> 8 & 0xff, value >> 16 & 0xff, value >> 24 & 0xff);
}

/**
 * Parses a DDS image file loaded as an ArrayBuffer
 * @param mArrayBuffer {ArrayBuffer} an ArrayBuffer containing the loaded dds data
 * @returns {Array} parseable array for loading into a cubemap
 */
function parseDDS(mArrayBuffer) {
    //	CHECKING MIP MAP LEVELS
    var ddsInfos = parseHeaders(mArrayBuffer);
    var flags = ddsInfos.flags;

    var header = new Int32Array(mArrayBuffer, 0, headerLengthInt);
    var mipmapCount = 1;
    if (flags & DDSD_MIPMAPCOUNT) {
        mipmapCount = Math.max(1, header[OFF_MIPMAPCOUNT]);
    }
    var DDSD_MIPMAPCOUNT = 0x20000;
    var OFF_MIPMAPCOUNT = 7;
    var headerLengthInt = 31;
    var sources = ddsInfos.images.map(function (img) {
        var faceData = new Float32Array(mArrayBuffer.slice(img.offset, img.offset + img.length));
        return {
            data: faceData,
            shape: img.shape,
            mipmapCount: mipmapCount
        };
    });

    return sources;
}

// credits - Marcin Ignac, Yi-wen Lin, and more


// Code ported by Marcin Ignac (2014)
// Based on Java implementation from
// https://code.google.com/r/cys12345-research/source/browse/hdr/image_processor/RGBE.java?r=7d84e9fd866b24079dbe61fa0a966ce8365f5726
var radiancePattern = '#\\?RADIANCE';
var commentPattern = '#.*';
// let gammaPattern = 'GAMMA=';
var exposurePattern = 'EXPOSURE=\\s*([0-9]*[.][0-9]*)';
var formatPattern = 'FORMAT=32-bit_rle_rgbe';
var widthHeightPattern = '-Y ([0-9]+) \\+X ([0-9]+)';

function readPixelsRawRLE(buffer, data, offset, fileOffset, scanlineWidth, numScanlines) {
    var rgbe = new Array(4);
    var scanlineBuffer = null;
    var ptr = void 0;
    var ptrEnd = void 0;
    var count = void 0;
    var buf = new Array(2);
    var bufferLength = buffer.length;

    function readBuf(buf) {
        var bytesRead = 0;
        do {
            buf[bytesRead++] = buffer[fileOffset];
        } while (++fileOffset < bufferLength && bytesRead < buf.length);
        return bytesRead;
    }

    function readBufOffset(buf, offset, length) {
        var bytesRead = 0;
        do {
            buf[offset + bytesRead++] = buffer[fileOffset];
        } while (++fileOffset < bufferLength && bytesRead < length);
        return bytesRead;
    }

    function readPixelsRaw(buffer, data, offset, numpixels) {
        var numExpected = 4 * numpixels;
        var numRead = readBufOffset(data, offset, numExpected);
        if (numRead < numExpected) {
            throw new Error('Error reading raw pixels: got ' + numRead + ' bytes, expected ' + numExpected);
        }
    }

    while (numScanlines > 0) {
        if (readBuf(rgbe) < rgbe.length) {
            throw new Error('Error reading bytes: expected ' + rgbe.length);
        }

        if (rgbe[0] !== 2 || rgbe[1] !== 2 || (rgbe[2] & 0x80) !== 0) {
            // this file is not run length encoded
            data[offset++] = rgbe[0];
            data[offset++] = rgbe[1];
            data[offset++] = rgbe[2];
            data[offset++] = rgbe[3];
            readPixelsRaw(buffer, data, offset, scanlineWidth * numScanlines - 1);
            return;
        }

        if (((rgbe[2] & 0xFF) << 8 | rgbe[3] & 0xFF) !== scanlineWidth) {
            throw new Error('Wrong scanline width ' + ((rgbe[2] & 0xFF) << 8 | rgbe[3] & 0xFF) + ', expected ' + scanlineWidth);
        }

        if (scanlineBuffer === null) {
            scanlineBuffer = new Array(4 * scanlineWidth);
        }

        ptr = 0;
        /* read each of the four channels for the scanline into the buffer */
        for (var i = 0; i < 4; i++) {
            ptrEnd = (i + 1) * scanlineWidth;
            while (ptr < ptrEnd) {
                if (readBuf(buf) < buf.length) {
                    throw new Error('Error reading 2-byte buffer');
                }
                if ((buf[0] & 0xFF) > 128) {
                    /* a run of the same value */
                    count = (buf[0] & 0xFF) - 128;
                    if (count === 0 || count > ptrEnd - ptr) {
                        throw new Error('Bad scanline data');
                    }
                    while (count-- > 0) {
                        scanlineBuffer[ptr++] = buf[1];
                    }
                } else {
                    /* a non-run */
                    count = buf[0] & 0xFF;
                    if (count === 0 || count > ptrEnd - ptr) {
                        throw new Error('Bad scanline data');
                    }
                    scanlineBuffer[ptr++] = buf[1];
                    if (--count > 0) {
                        if (readBufOffset(scanlineBuffer, ptr, count) < count) {
                            throw new Error('Error reading non-run data');
                        }
                        ptr += count;
                    }
                }
            }
        }

        /* copy byte data to output */
        for (var _i = 0; _i < scanlineWidth; _i++) {
            data[offset + 0] = scanlineBuffer[_i];
            data[offset + 1] = scanlineBuffer[_i + scanlineWidth];
            data[offset + 2] = scanlineBuffer[_i + 2 * scanlineWidth];
            data[offset + 3] = scanlineBuffer[_i + 3 * scanlineWidth];
            offset += 4;
        }

        numScanlines--;
    }
}

// Returns data as floats and flipped along Y by default
function parseHDR(buffer) {
    if (buffer instanceof ArrayBuffer) {
        buffer = new Uint8Array(buffer);
    }

    var fileOffset = 0;
    var bufferLength = buffer.length;

    var NEW_LINE = 10;

    function readLine() {
        var buf = '';
        do {
            var b = buffer[fileOffset];
            if (b === NEW_LINE) {
                ++fileOffset;
                break;
            }
            buf += String.fromCharCode(b);
        } while (++fileOffset < bufferLength);
        return buf;
    }

    var width = 0;
    var height = 0;
    var exposure = 1;
    var gamma = 1;
    var rle = false;

    for (var i = 0; i < 20; i++) {
        var line = readLine();
        var match = void 0;
        if (match = line.match(radiancePattern)) {} else if (match = line.match(formatPattern)) {
            rle = true;
        } else if (match = line.match(exposurePattern)) {
            exposure = Number(match[1]);
        } else if (match = line.match(commentPattern)) {} else if (match = line.match(widthHeightPattern)) {
            height = Number(match[1]);
            width = Number(match[2]);
            break;
        }
    }

    if (!rle) {
        throw new Error('File is not run length encoded!');
    }

    var data = new Uint8Array(width * height * 4);
    var scanlineWidth = width;
    var numScanlines = height;

    readPixelsRawRLE(buffer, data, 0, fileOffset, scanlineWidth, numScanlines);

    // TODO: Should be Float16
    var floatData = new Float32Array(width * height * 4);
    for (var offset = 0; offset < data.length; offset += 4) {
        var r = data[offset + 0] / 255;
        var g = data[offset + 1] / 255;
        var b = data[offset + 2] / 255;
        var e = data[offset + 3];
        var f = Math.pow(2.0, e - 128.0);

        r *= f;
        g *= f;
        b *= f;

        var floatOffset = offset;

        floatData[floatOffset + 0] = r;
        floatData[floatOffset + 1] = g;
        floatData[floatOffset + 2] = b;
        floatData[floatOffset + 3] = 1.0;
    }

    return {
        shape: [width, height],
        exposure: exposure,
        gamma: gamma,
        data: floatData
    };
}

var _createClass$3 = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck$3(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Loads a DDS image
 * @param url path to the image
 * @returns {Promise} returns a Promise. Resolves with dds data in it.
 */
function loadDDS(url) {
    var req = new XMLHttpRequest();
    var responseType = "arraybuffer";
    req.open("GET", url, true);
    req.responseType = responseType;

    return new Promise(function (resolve, reject) {
        req.onload = function () {
            var dds = parseDDS(req.response);
            resolve(dds);
        };

        req.onerror = function (e) {
            console.log(e);
            reject(e);
        };
        req.send();
    });
}

/**
 * Loads an .hdr image
 * @param url {String} url to the image
 */


var AssetLoader = function () {
    function AssetLoader() {
        var images = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

        _classCallCheck$3(this, AssetLoader);

        this.images = images;
    }

    _createClass$3(AssetLoader, [{
        key: '_preFetchData',
        value: function _preFetchData() {}
    }]);

    return AssetLoader;
}();

var pbr = "precision highp float;\n#define saturate(x) clamp(x,0.0,1.0);\n#define PI 3.14159;\nconst float A = 0.15;\nconst float B = 0.50;\nconst float C = 0.10;\nconst float D = 0.20;\nconst float E = 0.02;\nconst float F = 0.30;\nvec3 toneMap(vec3 x){\n\treturn ((x*(A*x+C*B)+D*E)/(x*(A*x+B)+D*F))-E/F;\n}\nvec3 Uncharted2Tonemap( vec3 x )\n{\n\treturn ((x*(A*x+C*B)+D*E)/(x*(A*x+B)+D*F))-E/F;\n}\nvec3 EnvBRDFApprox( vec3 SpecularColor, float Roughness, float NoV )\n{\n\tconst vec4 c0 = vec4( -1, -0.0275, -0.572, 0.022 );\n\tconst vec4 c1 = vec4( 1, 0.0425, 1.04, -0.04 );\n\tvec4 r = Roughness * c0 + c1;\n\tfloat a004 = min( r.x * r.x, exp2( -9.28 * NoV ) ) * r.x + r.y;\n\tvec2 AB = vec2( -1.04, 1.04 ) * a004 + r.zw;\n\treturn SpecularColor * AB.x + AB.y;\n}\nvec3 fix_cube_lookup( vec3 v, float cube_size, float lod ) {\n\tfloat M = max(max(abs(v.x), abs(v.y)), abs(v.z));\n    float scale = 1.0 - exp2(lod) / cube_size;\n    if (abs(v.x) != M) v.x *= scale;\n    if (abs(v.y) != M) v.y *= scale;\n   \tif (abs(v.z) != M) v.z *= scale;\n\treturn v;\n}\nvec3 getPbr(vec3 N, vec3 V,samplerCube uRadianceMap, samplerCube uIrradianceMap, vec3 baseColor, float roughness, float metallic, float specular) {\n\tvec3 diffuseColor\t= baseColor - baseColor * metallic;\n\tvec3 specularColor\t= mix( vec3( 0.08 * specular ), baseColor, specular );\n\tvec3 color;\n\tfloat roughness4 = pow(roughness, 4.0);\n    float numMips = 6.0;\n   \tfloat mip = numMips - 1.0 + log2(roughness);\n   \tvec3 lookup\t= -reflect( V, N );\n    lookup = fix_cube_lookup( lookup, 512.0, mip );\n\tvec3 radiance = pow( textureLod( uRadianceMap, lookup, mip ).rgb, vec3( 2.2 ) );\n\tvec3 irradiance = pow( texture( uIrradianceMap, N ).rgb, vec3( 1 ) );\n\tfloat NoV\t\t\t= saturate( dot( N, V ) );\n\tvec3 reflectance\t= EnvBRDFApprox( specularColor, roughness4, NoV );\n    vec3 diffuse  \t\t= diffuseColor * irradiance;\n    vec3 _specular \t\t= radiance * reflectance;\n\tcolor\t\t\t\t= diffuse + _specular;\n\treturn color;\n}";

var vert$1 = "\nuniform mat4 projectionMatrix;\nuniform mat4 modelMatrix;\nuniform mat4 viewMatrix;\nuniform mat3 normalMatrix;\nuniform mat4 viewInverse;\nuniform float scale;\nin vec3 position;\nout vec3 vPosition;\nout vec3 vWsPosition;\nout vec3 vEyePosition;\nout mat3 vNormalMatrix;\nout mat4 vViewInverse;\nvoid main(){\n    vec3 pos = position;\n    pos.x *= scale;\n    pos.y *= scale;\n    pos.z *= scale;\n    vec4 worldSpacePosition = modelMatrix * vec4(position,1.);\n    vec4 viewSpacePosition = viewMatrix * worldSpacePosition;\n    vec4 eyeDirViewSpace = viewSpacePosition - vec4(0.0,0.0,0.0,1.0);\n    vPosition = position;\n    vWsPosition = worldSpacePosition.xyz;\n    vEyePosition = -vec3(viewMatrix * eyeDirViewSpace);\n    vNormalMatrix = normalMatrix;\n    vViewInverse = viewInverse;\n    gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(pos,1);\n}";

var frag$1 = "precision highp float;\nuniform samplerCube uIrradianceCubeMap;\nuniform samplerCube uRadianceCubeMap;\nuniform float uMetallic;\nuniform float uSpecular;\nuniform float uExposure;\nuniform float uRoughness;\nuniform float uGamma;\nin vec3 vPosition;\nin vec3 vWsPosition;\nin vec3 vEyePosition;\nin mat3 vNormalMatrix;\nin mat4 vViewInverse;\nconst vec3 uBaseColor = vec3(1.0,0.0,1.0);\nout vec4 glFragColor;\nvoid main(){\n   vec3 x = dFdx(vPosition);\n   vec3 y = dFdy(vPosition);\n   vec3 normal = normalize(cross(x,y));\n   vec3 vNormal = vNormalMatrix * normal;\n   vec3 vWsNormal = vec3(vViewInverse * vec4(vNormal,0.0));\n   vec3 N = normalize(vWsNormal);\n   vec3 V = normalize(vEyePosition);\n   vec3 color = getPbr(N,V,uRadianceCubeMap,uIrradianceCubeMap,uBaseColor,uRoughness,uMetallic,uSpecular);\n   color = toneMap(color * uExposure);\n   color = color * (1.0 / toneMap(vec3(10.0)));\n   color = pow(color,vec3(1.0 / uGamma));\n   float g = (color.r + color.g + color.b);\n   vec4 finalColor = vec4(color*color,g);\n   glFragColor = finalColor;\n}\n";

var _createClass$2 = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck$2(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var OuterShell = function () {
    function OuterShell(gl) {
        _classCallCheck$2(this, OuterShell);

        this.shape = new Icohedron(gl, 2, {
            vertex: vert$1,
            fragment: [pbr, frag$1],
            uniforms: ['scale', 'loaded', 'uIrradianceCubeMap', 'uRadianceCubeMap', 'viewInverse', 'uMetalic', 'uSpecular', 'uGamma', 'uExposure', 'uRoughness']
        });

        this.irradianceMap = ['img/irr_posx.png', 'img/irr_negx.png', 'img/irr_posy.png', 'img/irr_negy.png', 'img/irr_posz.png', 'img/irr_negz.png'];
        this.loaded = false;

        this.shape.scale = 20.0;
        this.gl = gl;

        this.pbr = {
            uMetallic: 1.0,
            uSpecular: 1.0,
            uGamma: 2.2,
            uExposure: 3.0,
            uRoughness: 0.05
        };

        this._loadMap();
    }

    _createClass$2(OuterShell, [{
        key: 'draw',
        value: function draw(camera) {
            var _this = this;

            var gl = this.gl;
            var shape = this.shape;

            // update normal matrix
            shape.calculateNormalMatrix(camera.view);
            shape.rotateY(1.0);
            shape.rotateZ(1.0);
            shape.rotateX(1.0);
            // only draw once all textures are loaded.
            if (this.loaded === true) {

                shape.draw(camera, function (shader) {
                    shader.uniform('scale', 140.0);

                    _this.irradianceCubeMap.bind(0);
                    _this.radianceMap.bind(1);

                    shader.setTextureUniform('uIrradianceMap', 0);
                    shader.setTextureUniform('uRadianceCubeMap', 1);
                    shader.set3x3Uniform('normalMatrix', shape.normalMatrix);
                    shader.set4x4Uniform('viewInverse', camera.getInverseView());
                    shader.set4x4Uniform('modelMatrix', shape.model);

                    for (var i in _this.pbr) {
                        shader.uniform(i, _this.pbr[i]);
                    }
                });
            }
        }
    }, {
        key: '_loadMap',
        value: function _loadMap() {
            var _this2 = this;

            var gl = this.gl;
            var irrMap = this.irradianceMap;
            var images = [];
            var count = 0;

            irrMap.forEach(function (itm) {
                var img = new Image();
                img.src = itm;
                img.onload = function () {
                    images.push(img);
                    count += 1;
                };
            });

            var timer = setInterval(function () {
                if (count === 6) {
                    console.log("Outer shell irradiance map loaded");
                    _this2.irradianceCubeMap = createCubemap(gl, images);

                    loadDDS('img/studio_radiance.dds').then(function (dds) {
                        console.log("Outer shell radiance map loaded");
                        _this2.radianceMap = createCubemapFromDDS(gl, dds);
                        _this2.loaded = true;
                    }).catch(function (err) {
                        console.log("error", err);
                    });

                    clearInterval(timer);
                }
            });
        }
    }]);

    return OuterShell;
}();

var vert$2 = "\nuniform mat4 projectionMatrix;\nuniform mat4 modelMatrix;\nuniform mat4 viewMatrix;\nuniform vec3 eyePos;\nuniform vec3 roomDimensions;\nin vec3 position;\nin vec2 uv;\nin vec3 normal;\nout vec2 vUv;\nout vec3 vEyeDir;\nout vec3 vNormal;\nout vec4 vVertex;\nvoid main(){\n    vec3 pos = position;\n    vVertex = modelMatrix * vec4(pos,1.);\n    vNormal = normal;\n    vEyeDir = normalize(eyePos - vVertex.xyz);\n    vUv = uv;\n    gl_Position = projectionMatrix * viewMatrix * vVertex;\n}";

var frag$2 = "precision highp float;\nuniform vec3 eyePos;\nuniform float power;\nuniform float lightPower;\nuniform vec3 roomDimensions;\nuniform float timePer;\nuniform float time;\nuniform vec4 uLightColor;\nin vec3 eyeDir;\nin vec4 vVertex;\nin vec3 vNormal;\nvec3 v3( float x, float y, float z ){\n\treturn vec3( x, y, z );\n}\nvec3 h2rgb( float hue ){\n  float h = abs(hue - floor(hue)) * 6.;\n  vec3 c = vec3( 0., 0., 0. );\n  int f = int(floor( h ));\n  if(f==0)c=v3(1.,h,0.);else if(f==1)c=v3(2.-h,1.,0.);else if(f==2)c=v3(0.,1.,h-2.);else if(f==3)c=v3(0.,4.-h,1.);else if(f==4)c=v3(h-4.,0.,1.);else c=v3(1.,0.,6.-h);\n  return c;\n}\nout vec4 glFragColor;\nvoid main(){\nvec4 pos = normalize(vVertex);\n  float aoLight = 1.8 - length( vVertex.xyz ) * ( 0.0015 + ( power * 0.0015 ) );\n  float ceiling = 0.0;\n  if( vNormal.y < -1.0 || vNormal.y < -1.0 ){\n    ceiling = 1.0;\n  }\n  float yPer = clamp( vVertex.y / roomDimensions.y, 0.0, 1.0 );\n  float ceilingGlow = pow( yPer, 4.0 ) * .25;\n  ceilingGlow += pow( yPer, 20.0 );\n  ceilingGlow += pow( max( yPer - 4.7, 0.0 ), 5.0 );\n  vec3 litRoomColor = vec3( aoLight + ( ceiling + ceilingGlow * timePer ) * lightPower);\n  litRoomColor *= h2rgb(time / 10.0);\n  glFragColor = vec4(litRoomColor,1.);\n}\n";

var _createClass$4 = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck$4(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn$1(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits$1(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// Largely based on Robert Hodgin's Eyeo 2012 code.
// roberthodgin.com/portfolio/work/eyeo-2012/
// Lotta small tweaks to get things looking close to right.
var MAX_TIMEULTI = 120.0;

var RoomEnv = function (_Mesh) {
    _inherits$1(RoomEnv, _Mesh);

    function RoomEnv(gl) {
        _classCallCheck$4(this, RoomEnv);

        var _this = _possibleConstructorReturn$1(this, (RoomEnv.__proto__ || Object.getPrototypeOf(RoomEnv)).call(this, gl, {
            vertex: vert$2,
            fragment: frag$2,
            uniforms: ['eyePos', 'power', 'lightPower', 'roomDimensions', 'timePer', 'uLightColor']
        }));

        _this.mBoxSize = [800, 350, 800];
        _this.isPowerOn = false;
        _this.mPower = 1.0;
        _this.mTime = window.appTime;
        _this.mTimeAdjusted = 0.0;
        _this.mTimeMulti = 60.0;
        _this.mTimeElapsed = 0.0;
        _this.mTimer = 0.0;
        _this.mTick = false;

        _this.mPower = 1.0;

        // scale model matrix according to room size
        _this.scale(_this.mBoxSize);

        _this._buildMesh();
        return _this;
    }

    _createClass$4(RoomEnv, [{
        key: 'updateTime',
        value: function updateTime() {
            var saveFrame = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

            var isPowerOn = this.isPowerOn;
            if (isPowerOn) this.mPower -= (this.mPower - 1.0) * 0.2;else this.mPower -= (this.mPower - 0.0) * 0.2;

            var prevTime = this.mTime;
            this.mTime = window.appTime;
            var dt = this.mTime - prevTime;

            if (saveFrame) dt = 1.0 / 60.0;

            this.mTimeAdjusted = dt * this.mTimeMulti;
            this.mTimeElapsed += this.mTimeAdjusted;

            this.mTimer += this.mTimeAdjusted;
            this.mTick = false;

            if (this.mTimer > 1.0) {
                this.mTick = true;
                this.mTimer = 0.0;
            }
        }
    }, {
        key: 'draw',
        value: function draw(camera) {
            var shader = this.shader;
            var gl = this.gl;
            var vao = this.vao;

            gl.enable(gl.CULL_FACE);
            gl.cullFace(gl.BACK);
            shader.bind();

            shader.set4x4Uniform('projectionMatrix', camera.projection);
            shader.uniform("viewMatrix", camera.view);
            shader.uniform("view", camera.view);
            shader.uniform("modelMatrix", this.model);

            shader.uniform('eyePos', camera.eye);
            shader.uniform('roomDimensions', this.mBoxSize);
            shader.uniform('lightPower', this.getLightPower());
            shader.uniform('power', this.mPower);
            shader.uniform('timePer', this.getTimePer() * 1.5 + 0.5);
            shader.uniform('time', appTime);

            vao.bind();
            gl.drawElements(this.mode, this.numVertices, UNSIGNED_SHORT, 0);
            vao.unbind();
            gl.disable(gl.CULL_FACE);
        }
    }, {
        key: 'getPower',
        value: function getPower() {
            return this.mPower;
        }
    }, {
        key: 'getLightPower',
        value: function getLightPower() {
            var p = this.getPower() * 5.0 * Math.PI;
            var lightPower = Math.cos(p) * 0.5;
            return lightPower;
        }
    }, {
        key: 'getTimePer',
        value: function getTimePer() {
            return this.mTimeMulti / MAX_TIMEULTI;
        }
    }, {
        key: '_buildMesh',
        value: function _buildMesh() {
            var posCoords = [];
            var indices = [];
            var texCoords = [];
            var X = 1.0;
            var Y = 1.0;
            var Z = 1.0;
            var index = 0;

            var vVerts = [[-X, -Y, -Z], [-X, -Y, Z], [X, -Y, Z], [X, -Y, -Z], [-X, Y, -Z], [-X, Y, Z], [X, Y, Z], [X, Y, -Z]];

            var vIndices = [[0, 1, 3], [1, 2, 3], [4, 7, 5], [7, 6, 5], [0, 4, 1], [4, 5, 1], [2, 6, 3], [6, 7, 3], [1, 5, 2], [5, 6, 2], [3, 7, 0], [7, 4, 0]];

            // just writing out normals
            // by hand as the method used doesn't translate well from c++
            var normals = [[0, 1, 0], [0, 1, 0], [0, 1, 0], [0, 1, 0], [0, 1, 0], [0, 1, 0], [0, -1, 0], [0, -1, 0], [0, -1, 0], [0, -1, 0], [0, -1, 0], [0, -1, 0], [1, 0, 0], [1, 0, 0], [1, 0, 0], [1, 0, 0], [1, 0, 0], [1, 0, 0], [-1, 0, 0], [-1, 0, 0], [-1, 0, 0], [-1, 0, 0], [-1, 0, 0], [-1, 0, 0], [0, 0, -1], [0, 0, -1], [0, 0, -1], [0, 0, -1], [0, 0, -1], [0, 0, -1], [0, 0, 1], [0, 0, 1], [0, 0, 1], [0, 0, 1], [0, 0, 1], [0, 0, 1]];

            var vTexCoords = [[0, 0], [0, 1], [1, 1], [1, 0]];

            var tIndices = [[0, 1, 3], [1, 2, 3], [0, 1, 3], [1, 2, 3], [0, 1, 3], [1, 2, 3], [0, 1, 3], [1, 2, 3], [0, 1, 3], [1, 2, 3], [0, 1, 3], [1, 2, 3]];

            for (var i = 0; i < 12; ++i) {
                posCoords.push(vVerts[vIndices[i][0]]);
                posCoords.push(vVerts[vIndices[i][1]]);
                posCoords.push(vVerts[vIndices[i][2]]);
                indices.push(index++, index++, index++);
                texCoords.push(vTexCoords[tIndices[i][0]]);
                texCoords.push(vTexCoords[tIndices[i][1]]);
                texCoords.push(vTexCoords[tIndices[i][2]]);
            }

            this.addAttribute('position', flattenArray(posCoords));
            this.addAttribute('normal', flattenArray(normals));
            this.addAttribute('uv', flattenArray(texCoords));
            this.addIndices(indices);
        }
    }]);

    return RoomEnv;
}(Mesh);

var vert$3 = "\nuniform mat4 projectionMatrix;\nuniform mat4 modelMatrix;\nuniform mat4 viewMatrix;\nuniform vec2 resolution;\nuniform float lineWidth;\nuniform vec3 color;\nuniform float opacity;\nuniform float near;\nuniform float far;\nuniform float sizeAttenuation;\nin vec3 position;\nin vec3 previous;\nin vec3 next;\nin float side;\nin float width;\nin vec2 uv;\nin float counters;\nout vec4 vColor;\nout vec2 vUv;\nout float vCounters;\nvec2 fix( vec4 i, float aspect ) {\n    vec2 res = i.xy / i.w;\n    res.x *= aspect;\n\tvCounters = counters;\n    return res;\n}\nvoid main(){\n    vec3 pos = position;\n    float aspect = resolution.x / resolution.y;\n    float pixelWidthRatio = 1. / (resolution.x * projectionMatrix[0][0]);\n    vColor = vec4( color, opacity );\n    vUv = uv;\n    mat4 m = projectionMatrix * modelMatrix * viewMatrix;\n    vec4 finalPosition = m * vec4( position, 1.0 );\n    vec4 prevPos = m * vec4( previous, 1.0 );\n    vec4 nextPos = m * vec4( next, 1.0 );\n    vec2 currentP = fix( finalPosition, aspect );\n    vec2 prevP = fix( prevPos, aspect );\n    vec2 nextP = fix( nextPos, aspect );\n    float pixelWidth = finalPosition.w * pixelWidthRatio;\n    float w = 1.8 * pixelWidth * lineWidth * width;\n    if( sizeAttenuation == 1. ) {\n        w = 1.8 * lineWidth * width;\n    }\n    vec2 dir;\n    if(nextP == currentP) dir = normalize(currentP - prevP);\n    else if(prevP == currentP) dir = normalize(nextP - currentP);\n    else {\n         vec2 dir1 = normalize( currentP - prevP );\n          vec2 dir2 = normalize( nextP - currentP );\n          dir = normalize( dir1 + dir2 );\n          vec2 perp = vec2( -dir1.y, dir1.x );\n          vec2 miter = vec2( -dir.y, dir.x );\n    }\n    vec2 normal = vec2( -dir.y, dir.x );\n    normal.x /= aspect;\n    normal *= .5 * w;\n    vec4 offset = vec4( normal * side, 0.0, 1.0 );\n    finalPosition.xy += offset.xy;\n    gl_Position = finalPosition;\n    vUv = uv;\n    vec3 prev = previous;\n    vec3 nxt = next;\n    float s = side;\n    float wi = width;\n    float c = counters;\n}";

var frag$3 = "precision highp float;\nuniform sampler2D map;\nuniform sampler2D alphaMap;\nuniform bool useMap;\nuniform float useAlphaMap;\nuniform vec2 dashArray;\nuniform float visibility;\nuniform float alphaTest;\nuniform vec2 repeat;\nuniform float time;\nvec3 v3( float x, float y, float z ){\n\treturn vec3( x, y, z );\n}\nvec3 h2rgb( float hue ){\n  float h = abs(hue - floor(hue)) * 6.;\n  vec3 c = vec3( 0., 0., 0. );\n  int f = int(floor( h ));\n  if(f==0)c=v3(1.,h,0.);else if(f==1)c=v3(2.-h,1.,0.);else if(f==2)c=v3(0.,1.,h-2.);else if(f==3)c=v3(0.,4.-h,1.);else if(f==4)c=v3(h-4.,0.,1.);else c=v3(1.,0.,6.-h);\n  return c;\n}\nout vec4 glFragColor;\nin vec2 vUv;\nin vec4 vColor;\nin float vCounters;\nvoid main(){\n    vec4 c = vColor;\n    vec3 col = h2rgb(time / 2.0);\n    glFragColor = vec4(col,1.);\n}\n";

var _createClass$6 = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck$6(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn$2(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits$2(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// Nothing special here, pretty much a direct port from @spite's Three.js MeshLine
// https://github.com/spite/THREE.MeshLine/blob/master/src/THREE.MeshLine.js

var MeshLine = function (_Mesh) {
    _inherits$2(MeshLine, _Mesh);

    function MeshLine(gl) {
        _classCallCheck$6(this, MeshLine);

        var _this = _possibleConstructorReturn$2(this, (MeshLine.__proto__ || Object.getPrototypeOf(MeshLine)).call(this, gl, {
            vertex: vert$3,
            fragment: frag$3,
            uniforms: ['map', 'alphaMap', 'useMap', 'useAlphaMap', 'dashArray', 'visibility', 'alphaTest', 'repeat', 'resolution', 'lineWidth', 'color', 'opacity', 'near', 'far', 'time', 'sizeAttenuation']
        }));

        _this.mode = gl.TRIANGLES;
        _this.params = {
            map: [],
            alphaMap: [],
            useMap: 0,
            useAlphaMap: 0,
            color: [1, 0, 0],
            opacity: 1,
            alphaTest: 0.2,
            resolution: [window.innerWidth, window.innerHeight],
            sizeAttenuation: false,
            lineWidth: randInt(3, 15),
            near: 0.1,
            far: 1000.0
        };

        window.addEventListener('resize', function () {
            _this.params.resolution = [window.innerWidth, window.innerHeight];
        });

        return _this;
    }

    _createClass$6(MeshLine, [{
        key: 'draw',
        value: function draw(camera) {
            var shader = this.shader;
            this.shader.bind();

            // update normal matrix
            this.calculateNormalMatrix(camera.view);

            shader.set4x4Uniform('projectionMatrix', camera.projection);
            shader.set4x4Uniform('modelMatrix', this.model);
            shader.set4x4Uniform('viewMatrix', camera.view);
            shader.uniform('time', appTime);

            for (var i in this.params) {
                shader.uniform(i, this.params[i]);
            }

            // bind vao
            this.vao.bind();

            this.gl.drawElements(this.mode, this.numVertices, UNSIGNED_SHORT, 0);
            // unbind vao
            this.vao.unbind();
        }
    }, {
        key: 'buildMesh',
        value: function buildMesh(startingVertices) {
            var gl = this.gl;
            this.positions = [];
            this.next = [];
            this.side = [];
            this.width = [];
            this.indices = [];
            this.uvs = [];
            this.counters = [];

            var g = startingVertices;
            for (var j = 0; j < g.length; j += 3) {
                var c = j / g.length;
                this.positions.push(g[j], g[j + 1], g[j + 2]);
                this.positions.push(g[j], g[j + 1], g[j + 2]);
                this.counters.push(c);
                this.counters.push(c);
            }

            this._process();

            this.addAttribute('position', this.positions);
            this.addAttribute('previous', this.previous);
            this.addAttribute('next', this.next);
            this.addAttribute('side', this.side, 1);
            this.addAttribute('width', this.width, 1);
            this.addAttribute('uv', this.uvs, 2);
            this.addAttribute('counters', this.counters, 1);
            this.addIndices(this.indices);
        }
    }, {
        key: '_compareV3',
        value: function _compareV3(a, b) {
            var aa = a * 6;
            var ab = b * 6;
            return this.positions[aa] === this.positions[ab] && this.positions[aa + 1] === this.positions[ab + 1] && this.positions[aa + 2] === this.positions[ab + 2];
        }
    }, {
        key: '_copyV3',
        value: function _copyV3(a) {
            var aa = a * 6;
            return [this.positions[aa], this.positions[aa + 1], this.positions[aa + 2]];
        }
    }, {
        key: '_process',
        value: function _process() {

            var l = this.positions.length / 6;

            this.previous = [];
            this.next = [];
            this.side = [];
            this.width = [];
            this.indices = [];
            this.uvs = [];

            for (var j = 0; j < l; j++) {
                this.side.push(1);
                this.side.push(-1);
            }

            var w;
            for (var j = 0; j < l; j++) {
                if (this.widthCallback) w = this.widthCallback(j / (l - 1));else w = 1;
                this.width.push(w);
                this.width.push(w);
            }

            for (var j = 0; j < l; j++) {
                this.uvs.push(j / (l - 1), 0);
                this.uvs.push(j / (l - 1), 1);
            }

            var v;

            if (this._compareV3(0, l - 1)) {
                v = this._copyV3(l - 2);
            } else {
                v = this._copyV3(0);
            }
            this.previous.push(v[0], v[1], v[2]);
            this.previous.push(v[0], v[1], v[2]);
            for (var j = 0; j < l - 1; j++) {
                v = this._copyV3(j);
                this.previous.push(v[0], v[1], v[2]);
                this.previous.push(v[0], v[1], v[2]);
            }

            for (var j = 1; j < l; j++) {
                v = this._copyV3(j);
                this.next.push(v[0], v[1], v[2]);
                this.next.push(v[0], v[1], v[2]);
            }

            if (this._compareV3(l - 1, 0)) {
                v = this._copyV3(1);
            } else {
                v = this._copyV3(l - 1);
            }
            this.next.push(v[0], v[1], v[2]);
            this.next.push(v[0], v[1], v[2]);

            for (var j = 0; j < l - 1; j++) {
                var n = j * 2;
                this.indices.push(n, n + 1, n + 2);
                this.indices.push(n + 2, n + 1, n + 3);
            }
        }
    }, {
        key: '_memcpy',
        value: function _memcpy(src, srcOffset, dst, dstOffset, length) {
            var i;

            src = src.subarray || src.slice ? src : src.buffer;
            dst = dst.subarray || dst.slice ? dst : dst.buffer;

            src = srcOffset ? src.subarray ? src.subarray(srcOffset, length && srcOffset + length) : src.slice(srcOffset, length && srcOffset + length) : src;

            if (dst.set) {
                dst.set(src, dstOffset);
            } else {
                for (i = 0; i < src.length; i++) {
                    dst[i + dstOffset] = src[i];
                }
            }

            return dst;
        }
    }, {
        key: 'advance',
        value: function advance(position) {
            var positions = this.positions;
            var previous = this.previous;
            var next = this.next;
            var l = positions.length;

            // PREVIOUS
            this._memcpy(positions, 0, previous, 0, l);

            // POSITIONS
            this._memcpy(positions, 6, positions, 0, l - 6);

            positions[l - 6] = position[0];
            positions[l - 5] = position[1];
            positions[l - 4] = position[2];
            positions[l - 3] = position[0];
            positions[l - 2] = position[1];
            positions[l - 1] = position[2];

            // NEXT
            this._memcpy(positions, 6, next, 0, l - 6);

            next[l - 6] = position[0];
            next[l - 5] = position[1];
            next[l - 4] = position[2];
            next[l - 3] = position[0];
            next[l - 2] = position[1];
            next[l - 1] = position[2];

            this.positions = positions;
            this.previous = previous;
            this.next = next;

            this.updateAttribute('position', this.positions);
            this.updateAttribute('previous', this.previous);
            this.updateAttribute('next', next);
        }
    }]);

    return MeshLine;
}(Mesh);

var _createClass$5 = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck$5(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MeshRibbonSystem = function () {
    function MeshRibbonSystem(gl) {
        _classCallCheck$5(this, MeshRibbonSystem);

        this.gl = gl;

        this._initializeLines();
    }

    _createClass$5(MeshRibbonSystem, [{
        key: '_initializeLines',
        value: function _initializeLines() {
            var num = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 20;

            var lines = [];
            var size = 100;

            for (var i = 0; i < num; ++i) {
                var line = new MeshLine(this.gl);
                var lineData = new Float32Array(size);
                for (var j = 0; j < size; j += 3) {
                    lineData[j] = -30 + .1 * j;
                    lineData[j + 1] = 5 * Math.sin(.01 * j);
                    lineData[j + 2] = -20;
                }
                line.buildMesh(lineData);
                lines.push({
                    line: line,
                    phi: Math.random() * 2 * Math.PI,
                    theta: Math.random() * 2 * Math.PI,
                    thetaSpeed: randFloat(-0.001, 0.001),
                    phiSpeed: randFloat(-0.001, 0.001),
                    radius: 200
                });
            }

            this.lines = lines;
            this.num = num;
        }
    }, {
        key: 'draw',
        value: function draw(camera) {
            var num = this.num;
            var gl = this.gl;

            for (var i = 0; i < num; ++i) {
                var line = this.lines[i];
                var x = cos(line.theta) * sin(line.phi) * line.radius;
                var y = sin(line.theta) * sin(line.phi) * line.radius;
                var z = cos(line.phi) * line.radius;

                line.line.advance([x, y, z]);
                line.line.draw(camera);
                line.theta += line.thetaSpeed * 0.05;
                line.phi += line.phiSpeed * 0.05;
            }
        }
    }]);

    return MeshRibbonSystem;
}();

// ========== GL SETUP ============= //
window.appTime = 0.0;

// build renderer
var gl$1 = createRenderer().setFullscreen().attachToScreen();

// build camera
var camera = PerspectiveCamera(Math.PI / 4, fullscreenAspectRatio(), 0.1, 10000);
camera = setZoom(camera, -1400.0);

// ========== OBJECT SETUP ============= //
var ico = new Icohedron(gl$1, 1);
ico.scale = 80.0;

var img = new Image();
img.src = "/img/matcap.jpg";
var drawInner = false;
img.onload = function () {
    ico.texture = createTexture2d(gl$1, {
        data: img
    });
    drawInner = true;
};

// outer pink shell
var outer = new OuterShell(gl$1);

// room
var room = new RoomEnv(gl$1);

// lines
var system = new MeshRibbonSystem(gl$1);

window.addEventListener('resize', function () {
    camera = updateProjection(camera);
});

animate();
function animate() {
    requestAnimationFrame(animate);
    gl$1.clearScreen();

    appTime += 0.01;

    // make sure camera orbits the center
    orbitTarget(camera, 0.2);

    room.updateTime();
    room.draw(camera);

    gl$1.enable(gl$1.DEPTH_TEST);
    system.draw(camera);

    ico.draw(camera, function (shader) {
        shader.uniform('scale', ico.scale);
        if (ico.hasOwnProperty('texture')) {
            ico.texture.bind();
            shader.uniform('uTex', 0);
        }
    });
    ico.rotateY(1.0);
    ico.rotateZ(1.0);

    gl$1.enable(gl$1.BLEND);
    gl$1.enableAlphaBlending();

    outer.draw(camera);

    gl$1.disableBlending();
}

/*
 room.updateTime();
 room.draw(camera);



 gl.enable(gl.DEPTH_TEST);
 ico.draw(camera,shader => {
 shader.uniform('scale',ico.scale);
 if(ico.hasOwnProperty('texture')){
 ico.texture.bind();
 shader.uniform('uTex',0)
 }
 });
 ico.rotateY(2.0);
 ico.rotateZ(2.0);
 gl.enable(gl.BLEND);
 gl.enableAlphaBlending();


 outer.draw(camera);
 gl.disableBlending();


 */

})));
