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
        Generator.addSetup(`initSetup_defaultBrightness`, `matrix57.set(BRIGHT_TYPICAL);`);
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
        for (let i = 0; i < 5; i++) {
            dm_matrix[i] = dmarray.slice(0+i*7, 7+i*7);
        }        
        
        // Generator.addInclude(`matrix57array${dmarray}`, `const uint8_t matrix57_${dmarray}[][5] = {\n  {B${dm_matrix[0]},B${dm_matrix[1]},B${dm_matrix[2]},B${dm_matrix[3]},B${dm_matrix[4]}}\n};`);
        Generator.addInclude(`matrix57array${dmarray}`, `const uint8_t matrix57_${dmarray}[5] = {\n  B${dm_matrix[0]},B${dm_matrix[1]},B${dm_matrix[2]},B${dm_matrix[3]},B${dm_matrix[4]}\n};`);
        Generator.addCode(`matrix57.display(matrix57_${dmarray});`);
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

}
