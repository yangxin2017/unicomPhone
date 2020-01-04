import { NgModule } from '@angular/core';
import { StimeagoPipe} from './stimeago/stimeago';
import { DeviceTypeInfoPipe } from './device-type-info/device-type-info';
//import { DevicetypePipe } from './devicetype/devicetype'
@NgModule({
	declarations: [StimeagoPipe,
    DeviceTypeInfoPipe],
	imports: [],
	exports: [StimeagoPipe,
    DeviceTypeInfoPipe]
})
export class PipesModule {}

