import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UniHeaderComponent } from './uni-header/uni-header';
import { UniFastlinkComponent } from './uni-fastlink/uni-fastlink';
import { UniAlertchartComponent } from './uni-alertchart/uni-alertchart';
import { UniRankchartComponent } from './uni-rankchart/uni-rankchart';
import { UniRankchartsafeComponent } from './uni-rankchartsafe/uni-rankchart';
import { TipBindComponent } from './tip-bind/tip-bind';
import { RouterspeedComponent } from './routerspeed/routerspeed';

@NgModule({
	declarations: [UniHeaderComponent,
    UniFastlinkComponent,
    UniAlertchartComponent,
    UniRankchartComponent,
    UniRankchartsafeComponent,
    TipBindComponent,
    RouterspeedComponent],
	imports: [IonicPageModule],
    exports: [UniHeaderComponent,
        UniRankchartsafeComponent,
    UniFastlinkComponent,
    UniAlertchartComponent,
    UniRankchartComponent,
    TipBindComponent,
    RouterspeedComponent]
})
export class ComponentsModule {}
