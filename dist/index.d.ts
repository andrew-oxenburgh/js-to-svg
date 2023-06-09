export type Size = {
    width: number;
    height: number;
};
export type VerticalLine = {
    x: number;
};
export type HorizontalLine = {
    y: number;
};
export type Line = VerticalLine | HorizontalLine;
export type Point = VerticalLine & HorizontalLine;
export type Points = Point[];
export type Rect = Point & Size;
export type Arc = {
    rx: number;
    ry: number;
    angle: number;
    largeArcFlag: 0 | 1;
    sweepFlag: 0 | 1;
    x: number;
    y: number;
};
//# sourceMappingURL=index.d.ts.map