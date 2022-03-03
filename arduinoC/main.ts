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


//% color="#4d9721" iconWidth=50 iconHeight=40
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
        let bright = parameter.CLKPIN.code;
        Generator.addCode(`matrix57.set(${bright});`);
    }

    //% extenralFunc
    // export function getBuiltinFunc_() {
    //     return [
    //         {matrix: "01010110101011010101101010110101011"},
    //         {matrix: "01010110101011010101101010110101011"},
    //         {matrix: "01010110101011010101101010110101011"},
    //         {matrix: "01010110101011010101101010110101011"},
    //         {matrix: "01010110101011010101101010110101011"}
    //     ]
    // }

    //% block="57 dot matrix display [DMARRAY]" blockType="command"
    //% DMARRAY.shadow="matrix" DMARRAY.params.row=5 DMARRAY.params.column=7
    // DMARRAY.params.builtinFunc="getBuiltinFunc_"
    export function setMatrix(parameter: any, block: any) {
        let dmarray = parameter.DMARRAY.code;
        Generator.addCode(`matrix57.set(${dmarray});`);
    }

    //% block="set Piranha LED [LEDSTATE] on [LEDPIN]" blockType="command"
    //% LEDPIN.shadow="dropdown" LEDPIN.options="PIN_DigitalWrite"
    //% LEDSTATE.shadow="dropdown" LEDSTATE.options="LEDONOFF" LEDSTATE.defl="HIGH"
    export function LEDState(parameter: any, block: any) {
        let ledPin = parameter.LEDPIN.code;
        let ledState = parameter.LEDSTATE.code;
        Generator.addCode(`digitalWrite(${ledPin},${ledState});`);
    }

    // block="when press [BUTTON]" blockType="hat"
    // BUTTON.shadow="dropdown" BUTTON.options="BTN" BUTTON.defl="BTN.A"
    // export function buttonPress(parameter: any, block: any) {
    //     let button = parameter.BUTTON.code;
    //     button = replace(button);
    //     let name = 'button' + button + 'PressCallback';
    //     if(Generator.board === 'microbit'){
    //         Generator.addEvent(name, void", name", true);
    //         Generator.addSetup(block.id, `onEvent(ID_BUTTON_${button}, PRESS, ${name});`, false);
    //     }else{
    //         Generator.addInclude('MPython', '#include <MPython.h>');
    //         Generator.addEvent(name,    void", name", true);
    //         Generator.addSetupMainTop("mPython.begin"  + "mPython.begin();");
    //         Generator.addSetup(`button${button}.setPressedCallback`, `button${button}.setPressedCallback(${name});`);
    //     }
    // }

    //% block="控制[YINJIAO]引脚的LED灯亮度为[LIANGDU]" blockType="command"
    //% YINJIAO.shadow="dropdown" YINJIAO.options="PIN_AnalogWrite" 
    //% LIANGDU.shadow="range"   LIANGDU.params.min=0    LIANGDU.params.max=255    LIANGDU.defl=255
    export function liangdu(parameter: any, block: any) {
        let YINJIAO = parameter.YINJIAO.code;
        let LIANGDU = parameter.LIANGDU.code;

        Generator.addCode(`analogWrite(${YINJIAO},${LIANGDU});`);
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

    //% block="show [STR] at x [X] y [Y]" blockType="command"
    //% STR.shadow="string" STR.defl=hello
    //% X.shadow="range" X.params.min=0 X.params.max=127 X.defl=0
    //% Y.shadow="range" Y.params.min=0 Y.params.max=63 Y.defl=0
    export function print(parameter: any, block: any) {
        let str = parameter.STR.code
        let x = parameter.X.code
        let y = parameter.Y.code
        Generator.addInclude('oled12864', '#include <oled12864.h>');
        Generator.addObject(`myoled`, `OLED_12864`, `myoled;`);
        Generator.addSetup(`myoled.begin`, `myoled.begin();`);
        Generator.addCode(`myoled.setCursor(${x}, ${y});\n\tmyoled.print(${str});`);
    }

    //% block="display QR code [STR] at x [X] y [Y] with size [SIZE]" blockType="command"
    //% STR.shadow="string" STR.defl=http://mindplus.cc
    //% X.shadow="range" X.params.min=0 X.params.max=127 X.defl=0
    //% Y.shadow="range" Y.params.min=0 Y.params.max=63 Y.defl=0
    //% SIZE.shadow="dropdownRound" SIZE.options="SIZE" SIZE.defl="SIZE.2"
    export function qrcode(parameter: any, block: any) {
        let str = parameter.STR.code
        let x = parameter.X.code
        let y = parameter.Y.code
        let size = parameter.SIZE.code
        Generator.addInclude('oled12864', '#include <oled12864.h>');
        Generator.addObject(`myoled`, `OLED_12864`, `myoled;`);
        Generator.addSetup(`myoled.begin`, `myoled.begin();`);
        Generator.addCode(`myoled.qrcode(${x}, ${y}, ${str}, ${size});`);
    }

    //% block="set the line width to [WIDTH] pixels" blockType="command"
    //% WIDTH.shadow="range" WIDTH.params.min=1 WIDTH.params.max=128 WIDTH.defl=1
    export function setLineWidth(parameter: any, block: any) {
        let width = parameter.WIDTH.code
        Generator.addInclude('oled12864', '#include <oled12864.h>');
        Generator.addObject(`myoled`, `OLED_12864`, `myoled;`);
        Generator.addSetup(`myoled.begin`, `myoled.begin();`);
        Generator.addCode(`myoled.setLineWidth(${width});`);
    }

    //% block="get the line width" blockType="reporter"
    export function getLineWidth(parameter: any, block: any) {
        Generator.addInclude('oled12864', '#include <oled12864.h>');
        Generator.addObject(`myoled`, `OLED_12864`, `myoled;`);
        Generator.addSetup(`myoled.begin`, `myoled.begin();`);
        Generator.addCode(`myoled.getLineWidth()`);
    }

    //% block="button [BUTTON] is pressed?" blockType="boolean"
    //% Flag.shadow="boolean"
    //% BUTTON.shadow="dropdown" BUTTON.options="BTN" BUTTON.defl="BTN.A"
    export function buttonIsPressed(parameter: any, block: any) {
        let button = parameter.BUTTON.code.replace("+"
    ");
        let code;
        if(Generator.board === 'microbit'){
            if (button === 'A') {
                code = `Button_A.isPressed() && !Button_B.isPressed()`;
            } else if (button === 'B') {
                code = `Button_B.isPressed() && !Button_A.isPressed()`;
            } else {
                code = `Button_AB.isPressed()`;
            }
            Generator.addCode([code, Generator.ORDER_UNARY_POSTFIX]);
        }else{
            code = `button${button}.isPressed()`;
            Generator.addInclude('MPython', '#include <MPython.h>');
            Generator.addSetupMainTop("mPython.begin"
    mPython.begin();");
            Generator.addCode([code, Generator.ORDER_UNARY_POSTFIX]);
        }
    }

    //% block="not [Flag]" blockType="boolean"
    //% Flag.shadow="boolean"
    export function notTrue(parameter: any) {
        console.log("notTrue==", parameter);
        let code: string = '!' + (parameter.Flag.code || 'false') + '';
        Generator.addCode([code, Generator.ORDER_UNARY_POSTFIX]);
    }

    function replace(str :string) {
        return str.replace("+"
    ");
    }
    /*
    //% block="AnalogWrite:[PIN_AnalogWrite],AnalogRead:[PIN_AnalogRead],DigitalWrite:[PIN_DigitalWrite],DigitalRead:[PIN_DigitalRead]" blockType="command"
    //% PIN_AnalogWrite.shadow="dropdownRound" PIN_AnalogWrite.options="PIN_AnalogWrite"
    //% PIN_AnalogRead.shadow="dropdownRound" PIN_AnalogRead.options="PIN_AnalogRead"
    //% PIN_DigitalWrite.shadow="dropdownRound" PIN_DigitalWrite.options="PIN_DigitalWrite"
    //% PIN_DigitalRead.shadow="dropdownRound" PIN_DigitalRead.options="PIN_DigitalRead"
    export function blocktest(parameter: any)
    {
        let PIN_AnalogWrite=parameter.PIN_AnalogWrite.code;
        let PIN_AnalogRead=parameter.PIN_AnalogRead.code;
        let PIN_DigitalWrite=parameter.PIN_DigitalWrite.code;
        let PIN_DigitalRead=parameter.PIN_DigitalRead.code;

        Generator.addCode([`(${PIN_AnalogWrite},${PIN_AnalogRead},${PIN_DigitalWrite},${PIN_DigitalRead})`, Generator.ORDER_UNARY_POSTFIX]);
    }

    */


}
