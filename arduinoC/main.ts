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
            {matrix: "{B00000000,B00001000,B00001110,B00001010,B00001000,B00111000,B00111000,B00000000}"},
            {matrix: "01010110101011010101101010110101011"},
            {matrix: "01010110101011010101101010110101011"},
            {matrix: "01010110101011010101101010110101011"},
            {matrix: "01010110101011010101101010110101011"}
        ]
    }

    //% block="57 dot matrix display [DMARRAY]" blockType="command"
    //% DMARRAY.shadow="matrix" DMARRAY.params.row=5 DMARRAY.params.column=7 DMARRAY.split="B" DMARRAY.defl="01010110101011010101101010110101011"
    //% DMARRAY.params.builtinFunc="getBuiltinFunc_"
    // http://download.dfrobot.top/extList.json
    export function displayArray(parameter: any, block: any) {
        let dmarray = parameter.DMARRAY.code;
        let dma = dmarray;
        Generator.addObject("matrix57array", `const uint8_t`, `matrix57(${clk},${dio});`);
        Generator.addCode(`matrix57.display(${dmarray}[0]);`);
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
