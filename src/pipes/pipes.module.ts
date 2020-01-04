import { NgModule } from '@angular/core';
import { StimeagoPipe } from './stimeago/stimeago';
import { DeviceTypeInfoPipe } from './device-type/device-type.pip'
@NgModule({
	declarations: [StimeagoPipe,DeviceTypeInfoPipe],
	imports: [],
	exports: [StimeagoPipe,DeviceTypeInfoPipe]
})
export class PipesModule {}
