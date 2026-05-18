(function () {
    window.addEventListener('load', () => {
        setTimeout(resize, 50);
    });
    const canvas = document.getElementById('bg-wave');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width, height, dpr;

    function resize() {
        dpr = window.devicePixelRatio || 1;
        width = canvas.clientWidth;
        height = canvas.clientHeight;

        console.log("canvas size:", width, height);

        canvas.width = width * dpr;
        canvas.height = height * dpr;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    window.addEventListener('resize', resize);
    resize();

    const lineCount = 10;      // ラインの本数
    const amplitude = 35;      // 波の振れ幅（px）
    const speed = 0.00092;      // 速度（小さいほどゆっくり）

    function draw(time) {
        ctx.clearRect(0, 0, width, height);

        ctx.lineWidth = 1;
        ctx.strokeStyle = '#00bcd4';

        for (let i = 0; i < lineCount; i++) {
            const t = time * speed + i * 0.01; // ラインごとの位相ずらし
            const baseOffset = i * 50;        // ライン同士の間隔


            // start,cp1,cp2,endの4つの点で曲線を作成
            const startX = -width * 0.01;
            const startY = height - baseOffset;

            const cp1X = width * 0.18;  
            const cp1Y = height * 0.55 + Math.sin(t) * amplitude;

            // 開くけど上に行きすぎないように調整
            const cp2X = width * 0.75;      
            const cp2Y = height * 0.18 + Math.cos(t * 0.8) * amplitude - 30;

            // 右上でいったん下へ反らせる
            const endX  = width * 1.42;
            const endY  = -height * 0.01 + baseOffset * 0.65;
            ctx.beginPath();
            ctx.moveTo(startX, startY);
            ctx.bezierCurveTo(cp1X, cp1Y, cp2X, cp2Y, endX, endY);
            ctx.stroke();
        }

        requestAnimationFrame(draw);
    }

    requestAnimationFrame(draw);
})();