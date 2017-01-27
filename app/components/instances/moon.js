export default function(phase,ode_moon){
    if (phase <= 0.0625 || phase > 0.9375) {
ode_moon = "\uD83C\uDF11";
    } else if (phase <= 0.1875) {
ode_moon = "\uD83C\uDF12";
    } else if (phase <= 0.3125) {
ode_moon = "\uD83C\uDF13";
    } else if (phase <= 0.4375) {
ode_moon = "\uD83C\uDF14";
    } else if (phase <= 0.5625) {
ode_moon = "\uD83C\uDF15";
    } else if (phase <= 0.6875) {
ode_moon = "\uD83C\uDF16";
    } else if (phase <= 0.8125) {
ode_moon = "\uD83C\uDF17";
    } else if (phase <= 0.9375) {
ode_moon = "\uD83C\uDF18";
		}
		return ode_moon
}
