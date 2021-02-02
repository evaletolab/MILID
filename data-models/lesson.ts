



enum LessonType {
    VIDEO ,
    PODCAST ,
    INFOGRAPHIC,
    LESSON, 
}

enum ColorPalette{
    PINK,
    CYAN,
}

enum AssetType
{
    PNG = 'image/png',
    SVG = 'image/svg+xml',
    JPG = 'image/jpeg',
    MP4 = 'video/mp4',
    MP3 = 'audio/mpeg'
}

class Asset
{
    public asset_type:AssetType;
    public url:string;
    public meta?:any;
}

class BaseLesson
{
    public lesson_type:LessonType;
    public title:string;
    public illustration?:Asset;
    public description?:string;
}

class VideoLesson extends BaseLesson
{
    public video_asset:Asset;
}

class PodcastLesson extends BaseLesson
{
    public audio_asset:Asset;
}

class Module
{
    public title:string;
    public color_palette:ColorPalette;
    public lessons:BaseLesson[];
}