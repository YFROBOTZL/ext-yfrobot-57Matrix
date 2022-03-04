/** 
 * @file yfrobot
 * @brief YFROBOT's sensors Mind+ library.
 * @n This is a MindPlus graphics programming extension for YFROBOT's module.
 * 
 * @copyright    YFROBOT,2022
 * @copyright    MIT Lesser General Public License
 * 
 * @author [email](yfrobot@qq.com)
 * @date  2022-03-03
*/

enum SIZE {
    //% block="29*29"
    1,
    //% block="58*58"
    2
}

enum LINE {
    //% block="1"
    1,
    //% block="2"
    2,
    //% block="3"
    3,
    //% block="4"
    4
}

enum BTN {
    //% block="A"
    A,
    //% block="B"
    B,
    //% block="A+B"
    AB
}

enum LEDONOFF {
    //% block="OFF"
    LOW,
    //% block="ON"
    HIGH
}

enum KAIGUAN {
    //% block="开"
    HIGH,
    //% block="关"
    LOW
}

enum PIN_DWrite {
    //% block="0(RX)"
    0,
    //% block="1(TX)"
    1,
    //% block="2"
    2,
    //% block="3"
    3,
    //% block="4"
    4,
    //% block="5"
    5,
    //% block="6"
    6,
    //% block="7"
    7,
    //% block="8"
    8,
    //% block="9"
    9,
    //% block="10(SS)"
    10,
    //% block="11(MOSI)"
    11,
    //% block="12(MISO)"
    12,
    //% block="13(LED/SCK)"
    13,
    //% block="A0"
    A0,
    //% block="A1"
    A1,
    //% block="A2"
    A2,
    //% block="A3"
    A3,
    //% block="A4(SDA)"
    A4,
    //% block="A5(SCL)"
    A5
}


//% color="#177cb0" iconWidth=50 iconHeight=40
namespace dotmatrix57 {

    //% block="57 dot matrix initliallize CLK [CLKPIN] DIO [DIOPIN]" blockType="command"
    //% CLKPIN.shadow="dropdown" CLKPIN.options="PIN_DigitalWrite"
    //% DIOPIN.shadow="dropdown" DIOPIN.options="PIN_DigitalWrite"
    export function init(parameter: any, block: any) {
        let clk = parameter.CLKPIN.code;
        let dio = parameter.DIOPIN.code;
        Generator.addInclude("includeMatrix57", `#include \"Matrix57.h\"`);
        Generator.addObject("matrix57Object", `Matrix57`, `matrix57(${clk},${dio});`);
        Generator.addSetup(`initSetup`, `matrix57.init();`);
    }

    //% block="57 dot matrix clean display" blockType="command"
    export function clean(parameter: any, block: any) {
        Generator.addCode(`matrix57.clearDisplay();`);
    }

    //% block="57 dot matrix set brightness [BRIGHTNESS]" blockType="command"
    //% BRIGHTNESS.shadow="range" BRIGHTNESS.params.min=0 BRIGHTNESS.params.max=7  BRIGHTNESS.defl=2
    export function setBrightness(parameter: any, block: any) {
        let bright = parameter.BRIGHTNESS.code;
        Generator.addCode(`matrix57.set(${bright});`);
    }

    
    //% extenralFunc
    export function getBuiltinFunc_() {
        return [
            {"matrix":"0000000000000111011100010001000101000000000110000000001100000000010100000001000100000100000100010000000101000000000100000"},
            {"matrix":"0000000000000111011100011111111101111111111111111111111111111111110111111111000111111100000111110000000111000000000100000"},
            {"matrix":"0000000000000000000000011000001001111000101011110010001011000000000000000000000000000000000111110000000000000000000000000"},
            {"matrix":"0000000000000000000000010100010100010000010000000000000000000000000010000010000010001000000011100000000000000000000000000"},
            {"matrix":"0000000000000000000000000000000000110000011001100000110000000000000001111100000100000100010000000100000000000000000000000"},
            {"matrix":"0000000000000000000000010000000100010000010000010001000001000001000100000001000000000000000011100000001000100000000000000"},
            {"matrix":"0100000010001110000111110000011001100000110001100000110010100001010101000010111100001110010000001000000000000000001110000"},
            {"matrix":"0000000000000000000000110110110111111101111101110001110001000001000000000000000000000000000100010000000111000000000000000"},
            {"matrix":"0000000000000000000000011110111100011000110000110001100001100011000010000010000000000000000011100000001000100000000000000"}
        ]
    }
    //% block="BadgeDisplay Matrix [MT] At X[X]" blockType="command"
    //% MT.shadow="matrix" MT.params.row=11 MT.params.column=11 MT.defl="0000000000000111011100010001000101000000000110000000001100000000010100000001000100000100000100010000000101000000000100000"
    //% X.shadow="range" X.params.min="1" X.params.max="44" X.defl="1"
    //% MT.params.builtinFunc="getBuiltinFunc_"
    export function setMatrix(parameter: any, block: any) {
        let matrix = parameter.MT.code;
        Generator.addInclude("addIncludeHuizhang","#include <Huizhang.h>");
        Generator.addObject("addhz_matrix","uint16_t",`hz_matrix[11];`);
        let hz_matrix:any[] = [0,0,0,0,0,0,0,0,0,0,0];
        for (let i = 0; i < 11; i++) {
            for (let j = 0; j < 11; j++) {
                hz_matrix[i] += matrix.charAt(i + 11 * j) << (10 - j);
            }
            if (hz_matrix[i] < 0x10) {
                hz_matrix[i] = "0x00" + hz_matrix[i].toString(16);
            } else if (hz_matrix[i] < 0x100) {
                hz_matrix[i] = "0x0" + hz_matrix[i].toString(16);
            } else {
                hz_matrix[i] = "0x" + hz_matrix[i].toString(16);
            }
            if (i % 2) Generator.addCode(`hz_matrix[${i-1}] = ${hz_matrix[i-1]};hz_matrix[${i}] = ${hz_matrix[i]};`);
            else if (i == 10) Generator.addCode(`hz_matrix[${i}] = ${hz_matrix[i]};`);
        }
        let x = parameter.X.code;
        Generator.addCode(`hz.SendMatrix(hz_matrix, ${x});`);
    }

    //% extenralFunc
    export function getBuiltinFuncx_() {
        return [
            {matrix: "00111000111110011111000111000001000"},
            {matrix: "00000000001000001110000010000000000"},
            {matrix: "00010000011100011111000111000001000"},
            {matrix: "01101100110110000000001000100011100"}
        ]
    }

    //% block="57 dot matrix display [DMARRAY]" blockType="command"
    //% DMARRAY.shadow="matrix" DMARRAY.params.row=5 DMARRAY.params.column=7 DMARRAY.split=true DMARRAY.defl="01101100110110000000001000100011100"
    //% DMARRAY.params.builtinFunc="getBuiltinFuncx_"
    // http://download.dfrobot.top/extList.json
    export function displayArray(parameter: any, block: any) {
        let dmarray = parameter.DMARRAY.code;
        let dm_matrix:any[] = [];
        let number_matrix = 0;
        // let xx = dmarray.slice(0, 4);
        for (let i = 0; i < 5; i++) {
            dm_matrix[i] = dmarray.slice(0+i*7, 7+i*7);
        }
        // Generator.addObject("matrix57array", `const uint8_t`, `matrix57[][7] = {\n  {B${xx}}\n};`);
        
        // Generator.addInclude("includeMatrix57", `#include \"Matrix57.h\"`);
        Generator.addInclude(`matrix57array${dmarray}`, `const uint8_t matrix57_${dmarray}[][5] = {\n  {B${dm_matrix[0]},B${dm_matrix[1]},B${dm_matrix[2]},B${dm_matrix[3]},B${dm_matrix[4]}}\n};`);
        // Generator.addObject(`matrix57array${dmarray}`, `const uint8_t`, `matrix57_${dmarray}[][7] = {\n  {B${dm_matrix[0]},B${dm_matrix[1]},B${dm_matrix[2]},B${dm_matrix[3]},B${dm_matrix[4]}}\n};`);
        Generator.addCode(`matrix57.display(matrix57_${dmarray}[${number_matrix}]);`);
        number_matrix++;
    }

    //% extenralFunc2
    export function getBuiltinFunc2_() {
        return [
            {matrix: "0000000"},
            {matrix: "1000000"},
            {matrix: "1100000"},
            {matrix: "1110000"},
            {matrix: "1111000"},
            {matrix: "1111100"},
            {matrix: "1111110"},
            {matrix: "1111111"}
        ]
    }
    
    //% block="57 dot matrix display row [ROW] display [DMROW]" blockType="command"
    //% ROW.shadow="range" ROW.params.min=1 ROW.params.max=5  ROW.defl=1
    //% DMROW.shadow="matrix" DMROW.params.row=1 DMROW.params.column=7 DMROW.defl="1000000"
    //% DMROW.params.builtinFunc="getBuiltinFunc2_"
    export function displayRow(parameter: any, block: any) {
        let dmrow = parameter.DMROW.code;
        let row = parameter.ROW.code;
        Generator.addCode(`matrix57.display(${row}-1,B${dmrow});`);
    }

    //% block="set Piranha LED [LEDSTATE] on [LEDPIN]" blockType="command"
    //% LEDPIN.shadow="dropdown" LEDPIN.options="PIN_DigitalWrite"
    //% LEDSTATE.shadow="dropdown" LEDSTATE.options="LEDONOFF" LEDSTATE.defl="HIGH"
    export function LEDState(parameter: any, block: any) {
        let ledPin = parameter.LEDPIN.code;
        let ledState = parameter.LEDSTATE.code;
        Generator.addCode(`digitalWrite(${ledPin},${ledState});`);
    }



    //% block="show [STR] on the [LINE] line" blockType="command"
    //% STR.shadow="string" STR.defl=hello
    //% LINE.shadow="dropdownRound" LINE.options="LINE" LINE.defl="LINE.1"
    export function println(parameter: any, block: any) {
        let str = parameter.STR.code
        let line = parameter.LINE.code
        Generator.addInclude('oled12864', '#include <oled12864.h>');
        Generator.addObject(`myoled`, `OLED_12864`, `myoled;`);
        Generator.addSetup(`myoled.begin`, `myoled.begin();`);
        Generator.addCode(`myoled.setCursorLine(${line});\n\tmyoled.printLine(${str});`);
    }

}
