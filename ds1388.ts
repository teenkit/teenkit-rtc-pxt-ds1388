/**
 * makecode DS1388 RTC Package.
 * 
 */

/**
 * DS1388 block
 */
//% weight=20 color=#8010f0 icon="\uf017" block="TEENKIT时钟"
namespace DS1388 {
    let DS1388_I2C_ADDR = 104;
    let DS1388_REG_SECOND = 0
    let DS1388_REG_MINUTE = 1
    let DS1388_REG_HOUR = 2
    let DS1388_REG_WEEKDAY = 3
    let DS1388_REG_DAY = 4
    let DS1388_REG_MONTH = 5
    let DS1388_REG_YEAR = 6
    let DS1388_REG_CTRL = 7
    let DS1388_REG_RAM = 8

    /**
     * set ds1388's reg
     */
    function setReg(reg: number, dat: number): void {
        let buf = pins.createBuffer(2);
        buf[0] = reg;
        buf[1] = dat;
        pins.i2cWriteBuffer(DS1388_I2C_ADDR, buf);
    }

    /**
     * get ds1388's reg
     */
    function getReg(reg: number): number {
        pins.i2cWriteNumber(DS1388_I2C_ADDR, reg, NumberFormat.UInt8BE);
        return pins.i2cReadNumber(DS1388_I2C_ADDR, NumberFormat.UInt8BE);
    }

    /**
     * convert a Hex data to Dec
     */
    function HexToDec(dat: number): number {
        return (dat >> 4) * 10 + (dat % 16);
    }

    /**
     * convert a Dec data to Hex
     */
    function DecToHex(dat: number): number {
        return Math.idiv(dat, 10) * 16 + (dat % 10)
    }

    /**
     * 启动时钟
     */
    //% blockId="DS1388_START" block="开始"
    //% weight=52 blockGap=8 
    export function start() {
        let t = getSecond()
        setSecond(t & 0x7f)
    }

    /**
     * 暂停时钟
     */
    //% blockId="DS1388_STOP" block="暂停"
    //% weight=51 blockGap=8 
    export function stop() {
        let t = getSecond()
        setSecond(t | 0x80)
    }

    /**
     * 读取年份
     */
    //% blockId="DS1388_GET_YEAR" block="年"
    //% weight=99 blockGap=8 
    export function getYear(): number {
        return (HexToDec(getReg(DS1388_REG_YEAR)) + 2000)
    }

    /**
     * 设置年份
     * @param dat is the Year will be set, eg: 2019
     */
    //% blockId="DS1388_SET_YEAR" block="设置 年 %dat"
    //% weight=69 blockGap=8 
    export function setYear(dat: number): void {
        setReg(DS1388_REG_YEAR, DecToHex(dat % 100))
    }

    /**
     * 读取月份
     */
    //% blockId="DS1388_GET_MONTH" block="月"
    //% weight=98 blockGap=8 
    export function getMonth(): number {
        return HexToDec(getReg(DS1388_REG_MONTH))
    }

    /**
     * 设置月份
     * @param dat is Month will be set.  eg: 11
     */
    //% blockId="DS1388_SET_MONTH" block="设置 月份 %dat"
    //% weight=68 blockGap=8
    //% dat.min=1 dat.max=12
    export function setMonth(dat: number): void {
        setReg(DS1388_REG_MONTH, DecToHex(dat % 13))
    }

    /**
     * 读取日
     */
    //% blockId="DS1388_GET_DAY" block="日"
    //% weight=97 blockGap=8 
    export function getDay(): number {
        return HexToDec(getReg(DS1388_REG_DAY))
    }

    /**
     * 设置日
     * @param dat is the Day will be set, eg: 17
     */
    //% blockId="DS1388_SET_DAY" block="设置 日 %dat"
    //% weight=67 blockGap=8
    //% dat.min=1 dat.max=31
    export function setDay(dat: number): void {
        setReg(DS1388_REG_DAY, DecToHex(dat % 32))
    }

    /**
     * 读取星期几
     */
    //% blockId="DS1388_GET_WEEKDAY" block="星期"
    //% weight=96 blockGap=8 
    export function getWeekday(): number {
        return HexToDec(getReg(DS1388_REG_WEEKDAY))
    }

    /**
     * 设置星期几
     * @param dat is the Week Day(1-7) will be set, eg: 4
     */
    //% blockId="DS1388_SET_WEEKDAY" block="设置 星期 %dat"
    //% weight=66 blockGap=8
    //% dat.min=1 dat.max=7
    export function setWeekday(dat: number): void {
        setReg(DS1388_REG_WEEKDAY, DecToHex(dat % 8))
    }

    /**
     * 读取小时
     */
    //% blockId="DS1388_GET_HOUR" block="小时"
    //% weight=95 blockGap=8 
    export function getHour(): number {
        return HexToDec(getReg(DS1388_REG_HOUR))
    }

    /**
     * 设置小时
     * @param dat is the Hour will be set, eg: 0
     */
    //% blockId="DS1388_SET_HOUR" block="设置 小时 %dat"
    //% weight=65 blockGap=8
    //% dat.min=0 dat.max=23
    export function setHour(dat: number): void {
        setReg(DS1388_REG_HOUR, DecToHex(dat % 24))
    }

    /**
     * 读取分钟
     */
    //% blockId="DS1388_GET_MINUTE" block="分钟"
    //% weight=94 blockGap=8 
    export function getMinute(): number {
        return HexToDec(getReg(DS1388_REG_MINUTE))
    }

    /**
     * 设置分钟
     * @param dat is the Minute will be set, eg: 0
     */
    //% blockId="DS1388_SET_MINUTE" block="设置 分钟 %dat"
    //% weight=64 blockGap=8
    //% dat.min=0 dat.max=59
    export function setMinute(dat: number): void {
        setReg(DS1388_REG_MINUTE, DecToHex(dat % 60))
    }

    /**
     * 读取秒
     */
    //% blockId="DS1388_GET_SECOND" block="秒"
    //% weight=93 blockGap=8 
    export function getSecond(): number {
        return HexToDec(getReg(DS1388_REG_SECOND))
    }

    /**
     * 设置秒
     * @param dat is the Second will be set, eg: 0
     */
    //% blockId="DS1388_SET_SECOND" block="设置 秒 %dat"
    //% weight=63 blockGap
    //% dat.min=0 dat.max=59
    export function setSecond(dat: number): void {
        setReg(DS1388_REG_SECOND, DecToHex(dat % 60))
    }

    /**
     * 初始化时钟的日期和时间
     * @param year is the Year will be set, eg: 2019
     * @param month is the Month will be set, eg: 11
     * @param day is the Day will be set, eg: 17
     * @param weekday is the Weekday will be set, eg: 1
     * @param hour is the Hour will be set, eg: 8
     * @param minute is the Minute will be set, eg: 30
     * @param second is the Second will be set, eg: 59
     */
    //% blockId="DS1388_SET_DATETIME" block="设置 年 %year|月 %month|日 %day|星期 %weekday|时 %hour|分 %minute|秒 %second"
    //% weight=60 blockGap
    export function DateTime(year: number, month: number, day: number, weekday: number, hour: number, minute: number, second: number): void {
        let buf = pins.createBuffer(8);
        buf[0] = DS1388_REG_SECOND;
        buf[1] = DecToHex(second % 60);
        buf[2] = DecToHex(minute % 60);
        buf[3] = DecToHex(hour % 24);
        buf[4] = DecToHex(weekday % 8);
        buf[5] = DecToHex(day % 32);
        buf[6] = DecToHex(month % 13);
        buf[7] = DecToHex(year % 100);
        pins.i2cWriteBuffer(DS1388_I2C_ADDR, buf)
    }

}
