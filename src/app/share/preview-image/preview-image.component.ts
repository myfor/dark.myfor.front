import { Component, ElementRef, ViewChild, Input, Output, EventEmitter, OnInit } from '@angular/core';

/**
 * 预览图默认最大宽度
 */
const DEFAULT_MAX_WIDTH = '25rem';
/**
 * 预览图默认最大高度
 */
const DEFAULT_MAX_HEIGHT = '15rem';

@Component({
    // tslint:disable-next-line: component-selector
    selector: 'preview-image',
    templateUrl: './preview-image.component.html',
    styleUrls: ['./preview-image.component.css']
})
export class PreviewImageComponent implements OnInit {

    imgStyle = {
        'max-width': DEFAULT_MAX_WIDTH,
        'max-height': DEFAULT_MAX_HEIGHT
    };

    @Input() initPath = '';

    @Input() set maxWidth(width: string) {
        this.imgStyle['max-width'] = width ? width : DEFAULT_MAX_WIDTH;
    }
    @Input() set maxHeight(height: string) {
        this.imgStyle['max-height'] = height ? height : DEFAULT_MAX_HEIGHT;
    }
    @Input() accept = '.png,.jpg,.jpeg,.gif,.bmp';

    @Output() fileChangeEvent = new EventEmitter<any>();

    selectedFile: any;
    @ViewChild('file', {static: false}) file: ElementRef;
    @ViewChild('preview', { static: false }) private preview: ElementRef;

    ngOnInit() {
        this.selectedFile = this.initPath ? true : false;
    }

    fileChange() {
        const eleFiles = this.file.nativeElement.files;
        if (eleFiles.length) {
            this.selectedFile = eleFiles[0];
            this.preview.nativeElement.src = window.URL.createObjectURL(eleFiles[0]);
        }
        this.fileChangeEvent.emit(this.selectedFile);
    }

    previewImg() {
        window.open(this.preview.nativeElement.src);
    }
}
