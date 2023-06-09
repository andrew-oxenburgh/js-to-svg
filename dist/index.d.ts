export type Origin = {
    x: number;
    y: number;
};
export type Size = {
    width: number;
    height: number;
};
export type Point = {
    x: number;
    y: number;
};
export type Rect = {
    x: number;
    y: number;
    width: number;
    height: number;
};
export type Points = Point[];
export type VerticalLine = {
    x: number;
};
export type HorizontalLine = {
    y: number;
};
export type Line = VerticalLine | HorizontalLine;
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