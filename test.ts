input.onButtonPressed(Button.A, () => {
    DS1388.setSecond(0)
})
DS1388.start()
basic.forever(() => {
    basic.showNumber(DS1388.getSecond() % 10)
    basic.pause(100)
})
