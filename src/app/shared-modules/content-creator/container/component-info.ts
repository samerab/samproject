import { VideoComponent } from "../video/video.component";
import { BreakComponent } from "../break/break.component";
import { DivComponent } from "../div/div.component";

export const INFO = {
    VideoComponent: {
        type: VideoComponent,
        config: {
            width: '50%',
            data: {
                type: 'video-info',
                title: 'Video Details',
                message: 'insert video url'
            }
        }
    },
    BreakComponent: {
        type: BreakComponent,
        config: {
            width: '300px',
            position: {top: '10%'},
            data: {
                type: 'prompt',
                title: 'Break Height',
                message: 'Insert Height',
                value: '5'
            }
        }
    },
    DivComponent: {
        type: DivComponent,
        config: {
            width: '45%',
            position: {top: '10%'},
            data: {
                type: 'columns',
                title: 'divs',
                message: 'divs',
            }
        }
    }
  }