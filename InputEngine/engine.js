/* 
 * Nabi on Javascript 0.1
 * Modified by Valuace LLC
 * Obtained from http: //www.cs.rochester.edu/u/ysong/korean.html
 * Under GPL license granted by Young Chol Song
 * The engine fires below user defined functions
 * Define the user funcitons in your codebase, and execute nabi_automata_2
 */

/*
   user defined functions:
	function user_commit(Array buf);
	function user_commit_keyval(char keyval);
	function user_preedit_insert(Array buf);
	function user_preedit_update(Array buf);

   call nabi_automata_2(char keyval) to use hangul_automata
*/




/* hangul.c */

function hangul_is_choseong(ch) {
	return (ch >= 0x1100 && ch <= 0x1159) ? 1 : 0;
}

function hangul_is_jungseong(ch) {
	return (ch >= 0x1161 && ch <= 0x11a2) ? 1 : 0;
}

function hangul_is_jongseong(ch) {
	return (ch >= 0x11a7 && ch <= 0x11f9) ? 1 : 0;
}

function
hangul_choseong_to_cjamo(ch) {
	var table = new Array(
		0x3131, /* 0x1100 */
		0x3132, /* 0x1101 */
		0x3134,
		0x3137,
		0x3138,
		0x3139,
		0x3141,
		0x3142,
		0x3143,
		0x3145,
		0x3146,
		0x3147,
		0x3148,
		0x3149,
		0x314a,
		0x314b,
		0x314c,
		0x314d, /* 0x1111 */
		0x314e /* 0x1112 */
	);

	if (ch < 0x1100 || ch > 0x1112)
		return ch;
	return table[ch - 0x1100];
}

function
hangul_jungseong_to_cjamo(ch) {
	var table = new Array(
		0x314f, /* 0x1161 */
		0x3150, /* 0x1162 */
		0x3151,
		0x3152,
		0x3153,
		0x3154,
		0x3155,
		0x3156,
		0x3157,
		0x3158,
		0x3159,
		0x315a,
		0x315b,
		0x315c,
		0x315d,
		0x315e,
		0x315f,
		0x3160,
		0x3161,
		0x3162, /* 0x1174 */
		0x3163 /* 0x1175 */
	);
	if (ch < 0x1161 || ch > 0x1175)
		return 0;
	return table[ch - 0x1161];
}

function
hangul_jongseong_to_cjamo(ch) {
	var table = new Array(
		0x3131, /* 0x11a8 */
		0x3132, /* 0x11a9 */
		0x3133,
		0x3134,
		0x3135,
		0x3136,
		0x3137,
		0x3139,
		0x313a,
		0x313b,
		0x313c,
		0x313d,
		0x313e,
		0x313f,
		0x3140,
		0x3141,
		0x3142,
		0x3144,
		0x3145,
		0x3146,
		0x3147,
		0x3148,
		0x314a,
		0x314b,
		0x314c,
		0x314d, /* 0x11c1 */
		0x314e /* 0x11c2 */
	);
	if (ch < 0x11a8 || ch > 0x11c2)
		return 0;
	return table[ch - 0x11a8];
}

function
hangul_choseong_to_jongseong(ch) {
	var table = new Array(
		0x11a8, /* kiyeok */
		0x11a9,
		0x11ab,
		0x11ae,
		0x0,
		0x11af,
		0x11b7,
		0x11b8,
		0x0,
		0x11ba,
		0x11bb,
		0x11bc,
		0x11bd,
		0x0,
		0x11be,
		0x11bf,
		0x11c0,
		0x11c1,
		0x11c2
	);
	if (ch < 0x1100 || ch > 0x1112)
		return 0;
	return table[ch - 0x1100];
}

function
hangul_jongseong_to_choseong(ch) {
	var table = new Array(
		0x1100, /* kiyeok */
		0x1101,
		0x1109,
		0x1102,
		0x110c,
		0x1112,
		0x1103,
		0x1105,
		0x1100,
		0x1106,
		0x1107,
		0x1109,
		0x1110,
		0x1111,
		0x1112,
		0x1106,
		0x1107,
		0x1109,
		0x1109,
		0x110a,
		0x110b,
		0x110c,
		0x110e,
		0x110f,
		0x1110,
		0x1111,
		0x1112
	);
	if (ch < 0x11a8 || ch > 0x11c2)
		return 0;
	return table[ch - 0x11a8];
}

function
hangul_jongseong_dicompose(ch) {
	var table = new Array(
		0, 0x1100, /* jong kiyeok = cho kiyeok */
		0x11a8, 0x1100,
		0x11a8, 0x1109,
		0, 0x1102,
		0x11ab, 0x110c,
		0x11ab, 0x1112,
		0, 0x1103,
		0, 0x1105,
		0x11af, 0x1100,
		0x11af, 0x1106,
		0x11af, 0x1107,
		0x11af, 0x1109,
		0x11af, 0x1110,
		0x11af, 0x1111,
		0x11af, 0x1112,
		0, 0x1106,
		0, 0x1107,
		0x11b8, 0x1109,
		0, 0x1109,
		0x11ba, 0x1109,
		0, 0x110b,
		0, 0x110c,
		0, 0x110e,
		0, 0x110f,
		0, 0x1110,
		0, 0x1111,
		0, 0x1112
	);

	jong = table[(ch - 0x11a8) * 2];
	cho = table[(ch - 0x11a8) * 2 + 1];
	return new Array(jong, cho);
}

function
hangul_jamo_to_syllable(loc_choseong, loc_jungseong, loc_jongseong) {
	var hangul_base = 0xac00;
	var choseong_base = 0x1100;
	var jungseong_base = 0x1161;
	var jongseong_base = 0x11a7;
	var njungseong = 21;
	var njongseong = 28;
	var ch;

	if (loc_jongseong == 0)
		loc_jongseong = 0x11a7;

	if (!(loc_choseong >= 0x1100 && loc_choseong <= 0x1112))
		return 0;
	if (!(loc_jungseong >= 0x1161 && loc_jungseong <= 0x1175))
		return 0;
	if (!(loc_jongseong >= 0x11a7 && loc_jongseong <= 0x11c2))
		return 0;

	loc_choseong -= choseong_base;
	loc_jungseong -= jungseong_base;
	loc_jongseong -= jongseong_base;

	ch = ((loc_choseong * njungseong) + loc_jungseong) * njongseong + loc_jongseong + hangul_base;
	return ch;
}


/* keyboard.h */

var keyboard_map_2 = new Array(
	0x0021, // exclam
	0x0022, // dbl quotes
	0x0023, // sharp
	0x0024, // dollar
	0x0025, // percent
	0x0026, // ampersand
	0x0027, // single quotes
	0x0028, // small bracket open
	0x0029, // small bracket close
	0x002A, // star
	0x002B, // plus
	0x002C, // comma
	0x002D, // minus
	0x002E, // period
	0x002F, // slash
	0x0030, // 0
	0x0031, // 1
	0x0032, // 2
	0x0033, // 3
	0x0034, // 4
	0x0035, // 5
	0x0036, // 6
	0x0037, // 7
	0x0038, // 8
	0x0039, // 9
	0x003A, // colon
	0x003B, // semicolon
	0x003C, // greater than
	0x003D, // eq
	0x003E, // less than
	0x003F, // question
	0x0040, // at
	0x1106, // mi-eum
	0x1172, // yu
	0x110E, // che-ot
	0x110B, // i-ung
	0x1104, // ssang di-gut
	0x1105, // ri-eul
	0x1112, // hi-eut
	0x1169, // oh
	0x1163, // ya
	0x1165, // euh
	0x1161, // a
	0x1175, // i
	0x1173, // eu
	0x116E, // u
	0x1164, // ssang a, i
	0x1168, // ssang euo, i
	0x1108, // ssang bi-eup
	0x1101, // ssang gi-eok
	0x1102, // ni-eun
	0x110A, // ssang si-eot
	0x1167, // yeo
	0x1111, // pi-eup
	0x110D, // ssang ji-eut
	0x1110, // ti-eut
	0x116D, // yo
	0x110F, // ki-euk
	0x005B, // large bracket open
	0x005C, // backslash
	0x005D, // large bracket close
	0x005E, // power
	0x005F, // underscore
	0x0060, // backquote
	0x1106, // mi-eum
	0x1172, // yu
	0x110E, // che-ot
	0x110B, // i-ung
	0x1103, // di-gut
	0x1105, // ri-eul
	0x1112, // hi-eut
	0x1169, // oh
	0x1163, // ya
	0x1165, // euh
	0x1161, // a
	0x1175, // i
	0x1173, // eu
	0x116E, // u
	0x1162, // a, i
	0x1166, // euo, i
	0x1107, // bi-eup
	0x1100, // gi-eok
	0x1102, // ni-eun
	0x1109, // si-eot
	0x1167, // yeo
	0x1111, // pi-eup
	0x110C, // ji-eut
	0x1110, // ti-eut
	0x116D, // yo
	0x110F, // ki-euk
	0x007B, // med bracket open
	0x007C, // strgt line vert
	0x007D, // med bracket close
	0x007E // tilde
);


/* ic.h */

// NabiIC
var index;
var stack = new Array();
var choseong = new Array();
var jungseong = new Array();
var jongseong = new Array();

function nabi_ic_is_empty() {
	return (choseong[0] == 0 && jungseong[0] == 0 && jongseong[0] == 0) ? 1 : 0;
}


/* ic.c */

function
nabi_ic_push(ch) {
	stack[++index] = ch;
}

function
nabi_ic_peek() {
	if (index < 0)
		return 0;
	return stack[index];
}

function
nabi_ic_pop() {
	if (index < 0)
		return 0;
	return stack[index--];
}

function
nabi_ic_buf_clear() {
	index = -1;
	stack[0] = 0;
	stack[1] = 0;
	stack[2] = 0;
	stack[3] = 0;
	stack[4] = 0;
	stack[5] = 0;
	stack[6] = 0;
	stack[7] = 0;
	stack[8] = 0;
	stack[9] = 0;
	stack[10] = 0;
	stack[11] = 0;

	choseong[0] = 0;
	choseong[1] = 0;
	choseong[2] = 0;
	choseong[3] = 0;

	jungseong[0] = 0;
	jungseong[1] = 0;
	jungseong[2] = 0;
	jungseong[3] = 0;

	jongseong[0] = 0;
	jongseong[1] = 0;
	jongseong[2] = 0;
	jongseong[3] = 0;
}

function
nabi_ic_commit() {
	var buf = new Array();
	if (nabi_ic_is_empty()) {
		return 0;
	}
	var n = 0;

	var ch;
	ch = hangul_jamo_to_syllable(choseong[0], jungseong[0], jongseong[0]);
	if (ch)
		buf[n++] = ch;
	else {
		if (choseong[0]) {
			ch = hangul_choseong_to_cjamo(choseong[0]);
			buf[n++] = ch;
		}
		if (jungseong[0]) {
			ch = hangul_jungseong_to_cjamo(jungseong[0]);
			buf[n++] = ch;
		}
		if (jongseong[0]) {
			ch = hangul_jongseong_to_cjamo(jongseong[0]);
			buf[n++] = ch;
		}
	}
	user_commit(buf);
	nabi_ic_buf_clear();
}

function
nabi_ic_commit_keyval(keyval) {
	user_commit_keyval(keyval);
}

function
nabi_ic_get_preedit_string() {
	var ch;
	var buf = new Array();
	var n = 0;
	if (choseong[0]) {
		if (jungseong[0]) {
			ch = hangul_jamo_to_syllable(choseong[0], jungseong[0], jongseong[0]);
			buf[n++] = ch;
		} else {
			if (jongseong[0]) {
				ch = hangul_choseong_to_cjamo(choseong[0]);
				buf[n++] = ch;
				ch = hangul_jongseong_to_cjamo(jongseong[0]);
				buf[n++] = ch;
			} else {
				ch = hangul_choseong_to_cjamo(choseong[0]);
				buf[n++] = ch;
			}
		}
	} else {
		if (jungseong[0]) {
			if (jongseong[0]) {
				ch = hangul_jungseong_to_cjamo(jungseong[0]);
				buf[n++] = ch;
				ch = hangul_jongseong_to_cjamo(jongseong[0]);
				buf[n++] = ch;
			} else {
				ch = hangul_jungseong_to_cjamo(jungseong[0]);
				buf[n++] = ch;
			}
		} else {
			if (jongseong[0]) {
				ch = hangul_jongseong_to_cjamo(jongseong[0]);
				buf[n++] = ch;
			} else {; /* have nothing */
			}
		}
	}
	return buf;
}

function
nabi_ic_preedit_insert() {
	buf = nabi_ic_get_preedit_string();
	user_preedit_insert(buf);
}

function
nabi_ic_preedit_update() {
	buf = nabi_ic_get_preedit_string();
	user_preedit_update(buf);
}


/* compose table from iiimf-hangul */

var compose_table_default = new Array(
	0x1100, 0x1100, 0x1101, /* chosung kiyeok + kiyeok = ssangkiyeok */
	0x1103, 0x1103, 0x1104,
	0x1107, 0x1107, 0x1108,
	0x1109, 0x1109, 0x110A,
	0x110C, 0x110C, 0x110D,
	0x1169, 0x1161, 0x116A,
	0x1169, 0x1162, 0x116B,
	0x1169, 0x1175, 0x116C,
	0x116E, 0x1165, 0x116F,
	0x116E, 0x1166, 0x1170,
	0x116E, 0x1175, 0x1171,
	0x1173, 0x1175, 0x1174,
	0x11A8, 0x11A8, 0x11A9,
	0x11A8, 0x11BA, 0x11AA,
	0x11AB, 0x11BD, 0x11AC,
	0x11AB, 0x11C2, 0x11AD,
	0x11AF, 0x11A8, 0x11B0,
	0x11AF, 0x11B7, 0x11B1,
	0x11AF, 0x11B8, 0x11B2,
	0x11AF, 0x11BA, 0x11B3,
	0x11AF, 0x11C0, 0x11B4,
	0x11AF, 0x11C1, 0x11B5,
	0x11AF, 0x11C2, 0x11B6,
	0x11B8, 0x11BA, 0x11B9,
	0x11BA, 0x11BA, 0x11BB
);


/* automata.c */

function
hangul_compose(first, last) {
	var cpr;
	for (cpr in compose_table_default) {
		if (compose_table_default[cpr * 3] == first && compose_table_default[cpr * 3 + 1] == last) {
			return compose_table_default[cpr * 3 + 2];
		}
	}
	return 0;
}

function
nabi_keyboard_mapping(keyval) {
	return keyboard_map_2[keyval - 0x0021];
}

function
nabi_automata_2(keyval) {
	var ch;
	ch = nabi_keyboard_mapping(keyval.charCodeAt(0));

	if (jongseong[0]) {
		if (hangul_is_choseong(ch)) {
			jong_ch = hangul_choseong_to_jongseong(ch);
			comp_ch = hangul_compose(jongseong[0], jong_ch);
			if (hangul_is_jongseong(comp_ch)) {
				jongseong[0] = comp_ch;
				nabi_ic_push(comp_ch);
			} else {
				nabi_ic_commit();
				choseong[0] = ch;
				nabi_ic_push(ch);
				nabi_ic_preedit_insert();
				return 0;
			}
			nabi_ic_preedit_update();
			return 0;
		}
		if (hangul_is_jungseong(ch)) {
			var pop, peek;
			pop = nabi_ic_pop();
			peek = nabi_ic_peek();

			if (hangul_is_jungseong(peek)) {
				jongseong[0] = 0;
				nabi_ic_commit();
				choseong[0] = hangul_jongseong_to_choseong(pop);
				jungseong[0] = ch;
				nabi_ic_push(choseong[0]);
				nabi_ic_push(ch);
			} else {
				var loc_choseong, loc_jongseong;
				ret_arr = hangul_jongseong_dicompose(jongseong[0]);
				loc_jongseong = ret_arr[0];
				loc_choseong = ret_arr[1];
				jongseong[0] = loc_jongseong;
				nabi_ic_commit();
				choseong[0] = loc_choseong;
				jungseong[0] = ch;
				nabi_ic_push(loc_choseong);
				nabi_ic_push(ch);
			}
			nabi_ic_preedit_insert();
			return 0;
		}
	} else if (jungseong[0]) {
		if (hangul_is_choseong(ch)) {
			if (choseong[0]) {
				jong_ch = hangul_choseong_to_jongseong(ch);
				if (hangul_is_jongseong(jong_ch)) {
					jongseong[0] = jong_ch;
					nabi_ic_push(jong_ch);
				} else {
					nabi_ic_commit();
					choseong[0] = ch;
					nabi_ic_push(ch);
					nabi_ic_preedit_insert();
					return 0;
				}
			} else {
				choseong[0] = ch;
				nabi_ic_push(ch);
			}
			nabi_ic_preedit_update();
			return 0;
		}
		if (hangul_is_jungseong(ch)) {
			comp_ch = hangul_compose(jungseong[0], ch);
			if (hangul_is_jungseong(comp_ch)) {
				jungseong[0] = comp_ch;
				nabi_ic_push(comp_ch);
			} else {
				nabi_ic_commit();
				jongseong[0] = ch;
				nabi_ic_push(ch);
				nabi_ic_preedit_insert();
				return 0;
			}
			nabi_ic_preedit_update();
			return 0;
		}
	} else if (choseong[0]) {
		if (hangul_is_choseong(ch)) {
			comp_ch = hangul_compose(choseong[0], ch);
			if (hangul_is_choseong(comp_ch)) {
				choseong[0] = comp_ch;
				nabi_ic_push(comp_ch);
			} else {
				nabi_ic_commit();
				choseong[0] = ch;
				nabi_ic_push(ch);
				nabi_ic_preedit_insert();
				return 0;
			}
			nabi_ic_preedit_update();
			return 0;
		}
		if (hangul_is_jungseong(ch)) {
			jungseong[0] = ch;
			nabi_ic_push(ch);
			nabi_ic_preedit_update();
			return 0;
		}
	} else {
		if (hangul_is_choseong(ch)) {
			choseong[0] = ch;
			nabi_ic_push(ch);
			nabi_ic_preedit_insert();
			return 0;
		} else if (hangul_is_jungseong(ch)) {
			jungseong[0] = ch;
			nabi_ic_push(ch);
			nabi_ic_preedit_insert();
			return 0;
		}
	}
	nabi_ic_commit();
	nabi_ic_commit_keyval(keyval);
	return 0;
}


/* debug */

function
debug_output() {
	alert_str = "OUTPUT\n" +
		"stack[0]: " + stack[0] + "\n" +
		"stack[1]: " + stack[1] + "\n" +
		"stack[2]: " + stack[2] + "\n" +
		"stack[3]: " + stack[3] + "\n" +
		"stack[4]: " + stack[4] + "\n" +
		"stack[5]: " + stack[5] + "\n" +
		"stack[6]: " + stack[6] + "\n" +
		"stack[7]: " + stack[7] + "\n" +
		"stack[8]: " + stack[8] + "\n" +
		"stack[9]: " + stack[9] + "\n" +
		"stack[10]: " + stack[10] + "\n" +
		"stack[11]: " + stack[11] + "\n" +
		"choseong[0]: " + choseong[0] + "\n" +
		"choseong[1]: " + choseong[1] + "\n" +
		"choseong[2]: " + choseong[2] + "\n" +
		"choseong[3]: " + choseong[3] + "\n" +
		"jungseong[0]: " + jungseong[0] + "\n" +
		"jungseong[1]: " + jungseong[1] + "\n" +
		"jungseong[2]: " + jungseong[2] + "\n" +
		"jungseong[3]: " + jungseong[3] + "\n" +
		"jongseong[0]: " + jongseong[0] + "\n" +
		"jongseong[1]: " + jongseong[1] + "\n" +
		"jongseong[2]: " + jongseong[2] + "\n" +
		"jongseong[3]: " + jongseong[3];
	alert(alert_str);
}