window.addEventListener("load", () => {
    const directions = {
        N: { name: "N", range: [337.5, 22.5] },
        NE: { name: "NE", range: [22.5, 67.5] },
        E: { name: "E", range: [67.5, 112.5] },
        SE: { name: "SE", range: [112.5, 157.5] },
        S: { name: "S", range: [157.5, 202.5] },
        SW: { name: "SW", range: [202.5, 247.5] },
        W: { name: "W", range: [247.5, 292.5] },
        NW: { name: "NW", range: [292.5, 337.5] },
    };
    const determineDirectionName = (angle) => {
        angle = Number(angle.toFixed(0));
        let direction_n_angle = {
            direction: "",
            angle: 0,
        };
        direction_n_angle.angle = angle;
        if (angle > directions.N.range[0] || angle < directions.N.range[1]) {
            direction_n_angle.angle = direction_n_angle.angle % 360;
            direction_n_angle.direction = directions.N.name;
            return direction_n_angle;
        }
        for (const key in directions) {
            if (Object.prototype.hasOwnProperty.call(directions, key)) {
                const direction = directions[key];
                if (direction.range[0] < angle && angle < direction.range[1]) {
                    direction_n_angle.direction = direction.name;
                    break;
                }
            }
        }
        return direction_n_angle;
    };
    const calculateDirection = (currentLocation, previousLocation) => {
        let deltaLat = currentLocation.lat - previousLocation.lat,
            deltaLong = currentLocation.long - previousLocation.long,
            angle = 0;
        angle = Math.abs((Math.atan(deltaLong / deltaLat) / Math.PI) * 180);
        if (deltaLong === 0) {
            if (deltaLat > 0) return determineDirectionName(0);
            else if (deltaLat < 0) return determineDirectionName(180);
            else return null;
        }
        if (deltaLat < 0) angle += 90;
        if (deltaLong < 0) angle = 360 - angle;
        return determineDirectionName(angle);
    };

    const compassDirections = `<svg id="compass-direction" viewBox="0 0 1656 1656" fill="none" xmlns="http://www.w3.org/2000/svg"><path id="direction-n" d="M863.327 201.727V289H849.264L808.142 229.554H807.418V289H791.608V201.727H805.756L846.835 261.216H847.602V201.727H863.327Z" fill="black"/><path id="direction-s" d="M845.037 1390.72C844.639 1387 842.963 1384.1 840.009 1382.03C837.082 1379.95 833.276 1378.91 828.588 1378.91C825.293 1378.91 822.466 1379.41 820.108 1380.41C817.75 1381.4 815.946 1382.75 814.696 1384.45C813.446 1386.16 812.807 1388.11 812.778 1390.29C812.778 1392.11 813.19 1393.69 814.014 1395.02C814.866 1396.36 816.017 1397.49 817.466 1398.43C818.915 1399.34 820.52 1400.11 822.281 1400.73C824.043 1401.36 825.818 1401.88 827.608 1402.31L835.79 1404.36C839.085 1405.12 842.253 1406.16 845.293 1407.47C848.361 1408.77 851.102 1410.42 853.517 1412.41C855.96 1414.4 857.892 1416.8 859.312 1419.61C860.733 1422.42 861.443 1425.72 861.443 1429.5C861.443 1434.61 860.136 1439.11 857.523 1443.01C854.909 1446.87 851.131 1449.89 846.188 1452.08C841.273 1454.24 835.321 1455.32 828.332 1455.32C821.543 1455.32 815.648 1454.27 810.648 1452.17C805.676 1450.07 801.784 1447 798.972 1442.96C796.188 1438.93 794.682 1434.01 794.455 1428.22H810.009C810.236 1431.26 811.173 1433.79 812.821 1435.8C814.469 1437.82 816.614 1439.33 819.256 1440.32C821.926 1441.32 824.909 1441.81 828.205 1441.81C831.642 1441.81 834.653 1441.3 837.239 1440.28C839.852 1439.23 841.898 1437.78 843.375 1435.93C844.852 1434.06 845.605 1431.87 845.634 1429.37C845.605 1427.1 844.938 1425.22 843.631 1423.74C842.324 1422.24 840.491 1420.99 838.134 1419.99C835.804 1418.97 833.077 1418.06 829.952 1417.27L820.023 1414.71C812.835 1412.86 807.153 1410.07 802.977 1406.32C798.83 1402.54 796.756 1397.52 796.756 1391.27C796.756 1386.13 798.148 1381.63 800.932 1377.76C803.744 1373.9 807.565 1370.9 812.395 1368.77C817.224 1366.61 822.693 1365.53 828.801 1365.53C834.994 1365.53 840.42 1366.61 845.08 1368.77C849.767 1370.9 853.446 1373.87 856.116 1377.68C858.787 1381.46 860.165 1385.8 860.25 1390.72H845.037Z" fill="black"/><path id="direction-e" d="M1390.61 871V783.727H1447.37V796.98H1406.42V820.673H1444.43V833.926H1406.42V857.747H1447.71V871H1390.61Z" fill="black"/><path id="direction-w" d="M227.974 871L203.344 783.727H220.347L236.071 847.861H236.881L253.67 783.727H269.139L285.972 847.903H286.739L302.463 783.727H319.466L294.835 871H279.239L261.767 809.764H261.085L243.571 871H227.974Z" fill="black"/></svg>`;

    const compassGraphics = `<svg id="compass-graphics" viewBox="0 0 1656 1656" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="828" cy="828" r="828" fill="white" /><path id="compass-arcs"d="M828 0C820.937 0 815.251 5.67994 815.251 12.736V159.641C815.251 166.697 820.937 172.377 828 172.377C835.063 172.377 840.748 166.697 840.748 159.641V12.736C840.748 5.67994 835.063 0 828 0ZM744.6 5.26601C743.755 5.17524 742.886 5.17524 742.007 5.2766C734.982 6.00883 729.918 12.2479 730.651 19.2658L737.077 80.7244C737.81 87.7423 744.056 92.8026 751.08 92.0697C758.105 91.3375 763.17 85.0984 762.436 78.0805L756.015 16.6222C755.373 10.4815 750.511 5.83939 744.6 5.26601ZM911.983 5.32652C906.072 5.89536 901.208 10.5372 900.561 16.677L894.091 78.1304C893.352 85.1477 898.417 91.3926 905.442 92.1306C912.466 92.8689 918.711 87.8134 919.45 80.7961L925.92 19.3375C926.659 12.3202 921.593 6.08055 914.569 5.34287C913.691 5.2521 912.828 5.25149 911.983 5.32652ZM658.927 17.6776C658.079 17.6843 657.216 17.7684 656.353 17.9499C649.443 19.4114 645.058 26.1464 646.52 33.0493L676.975 176.766C678.437 183.669 685.179 188.05 692.088 186.589C698.998 185.128 703.383 178.398 701.921 171.495L671.467 27.7727C670.186 21.7324 664.866 17.6313 658.927 17.6776ZM997.65 17.7986C991.712 17.7381 986.39 21.8513 985.106 27.8904L954.547 171.591C953.079 178.493 957.461 185.229 964.368 186.696C971.277 188.163 978.021 183.785 979.488 176.884L1010.05 33.1833C1011.52 26.2816 1007.13 19.5445 1000.23 18.0785C999.362 17.897 998.499 17.7986 997.65 17.7986ZM577.166 40.7087C575.516 40.5574 573.811 40.7389 572.132 41.2957C565.415 43.4772 561.762 50.6301 563.945 57.3406L583.059 116.111C585.243 122.822 592.408 126.471 599.125 124.291C605.842 122.109 609.489 114.951 607.307 108.24L588.193 49.4694C586.557 44.4364 582.117 41.1292 577.166 40.7087ZM1078.95 40.7389C1074 41.1595 1069.56 44.4678 1067.92 49.5006L1048.8 108.266C1046.61 114.976 1050.26 122.135 1056.98 124.316C1063.7 126.498 1070.86 122.852 1073.05 116.143L1092.17 57.372C1094.35 50.6615 1090.7 43.5029 1083.99 41.3217C1082.31 40.777 1080.6 40.5997 1078.95 40.7389ZM496.313 70.2671C494.657 70.2974 492.981 70.6605 491.367 71.3776C484.917 74.243 482.028 81.739 484.897 88.1865L544.622 222.427C547.49 228.875 554.993 231.757 561.447 228.891C567.897 226.026 570.792 218.53 567.923 212.083L508.192 77.8418C506.042 73.0058 501.282 70.1709 496.313 70.2671ZM1160.72 70.718C1155.75 70.6272 1150.98 73.4442 1148.83 78.276L1088.92 212.434C1086.04 218.878 1088.92 226.379 1095.37 229.254C1101.82 232.129 1109.33 229.256 1112.2 222.812L1172.11 88.654C1174.99 82.2101 1172.11 74.7086 1165.66 71.8339C1164.05 71.1168 1162.37 70.7543 1160.72 70.718ZM421.265 109.937C418.818 109.756 416.296 110.3 414.003 111.625C407.886 115.153 405.805 122.912 409.337 129.023L440.264 182.539C443.796 188.649 451.561 190.728 457.678 187.2C463.794 183.672 465.875 175.913 462.344 169.803L431.416 116.287C429.209 112.468 425.345 110.222 421.265 109.937ZM1234.73 109.937C1230.66 110.209 1226.8 112.467 1224.59 116.286L1193.66 169.802C1190.12 175.912 1192.21 183.671 1198.33 187.199C1204.44 190.727 1212.21 188.648 1215.74 182.538L1246.67 129.022C1250.2 122.911 1248.12 115.153 1242 111.625C1239.71 110.302 1237.18 109.768 1234.73 109.937ZM348.391 155.345C345.937 155.436 343.481 156.223 341.337 157.775C335.62 161.918 334.356 169.851 338.505 175.562L424.849 294.473C428.996 300.184 436.942 301.447 442.659 297.305C448.376 293.162 449.64 285.229 445.491 279.517L359.142 160.607C356.549 157.037 352.477 155.206 348.391 155.345ZM1308.52 155.993C1304.44 155.842 1300.36 157.672 1297.77 161.237L1211.26 280.032C1207.1 285.737 1208.36 293.673 1214.07 297.825C1219.78 301.975 1227.72 300.726 1231.88 295.023L1318.38 176.228C1322.54 170.522 1321.28 162.586 1315.57 158.435C1313.43 156.88 1310.97 156.081 1308.52 155.993ZM283.251 209.921C279.997 209.739 276.677 210.826 274.052 213.186C268.803 217.907 268.381 225.927 273.107 231.171L314.493 277.102C319.219 282.346 327.247 282.768 332.496 278.046C337.746 273.325 338.168 265.299 333.441 260.055L292.06 214.13C289.698 211.507 286.506 210.092 283.251 209.921ZM1372.84 210.012C1369.59 210.193 1366.4 211.6 1364.03 214.222L1322.65 260.142C1317.92 265.385 1318.34 273.411 1323.59 278.132C1328.84 282.854 1336.87 282.43 1341.59 277.188L1382.98 231.269C1387.71 226.025 1387.29 217.999 1382.04 213.278C1379.41 210.918 1376.1 209.841 1372.84 210.012ZM220.82 269.832C217.565 270.014 214.379 271.421 212.016 274.043C207.291 279.287 207.713 287.307 212.961 292.028L322.249 390.315C327.498 395.036 335.526 394.613 340.251 389.371C344.977 384.127 344.56 376.106 339.309 371.385L230.017 273.099C227.391 270.739 224.074 269.661 220.82 269.832ZM1435.58 270.262C1432.32 270.08 1429 271.164 1426.37 273.521L1317.02 371.731C1311.77 376.448 1311.33 384.469 1316.05 389.716C1320.78 394.964 1328.81 395.39 1334.06 390.672L1443.42 292.463C1448.67 287.746 1449.1 279.725 1444.38 274.478C1442.02 271.854 1438.83 270.435 1435.58 270.262ZM168.902 336.525C164.815 336.374 160.74 338.213 158.146 341.78C153.994 347.488 155.253 355.42 160.969 359.567L211.01 395.889C216.724 400.037 224.663 398.785 228.814 393.076C232.966 387.367 231.71 379.43 225.998 375.283L175.956 338.96C173.815 337.405 171.354 336.613 168.902 336.525ZM1487.44 336.988C1484.99 337.079 1482.53 337.862 1480.39 339.418L1430.33 375.707C1424.61 379.851 1423.35 387.789 1427.49 393.5C1431.64 399.211 1439.58 400.469 1445.3 396.326L1495.37 360.037C1501.08 355.893 1502.34 347.961 1498.2 342.249C1495.6 338.68 1491.53 336.848 1487.44 336.988ZM120.385 407.665C116.306 407.937 112.447 410.194 110.239 414.013C106.708 420.124 108.788 427.882 114.905 431.41L242.25 504.863C248.367 508.391 256.133 506.312 259.664 500.202C263.196 494.091 261.115 486.333 254.999 482.805L127.653 409.352C125.361 408.03 122.833 407.495 120.385 407.665ZM1535.61 407.665C1533.17 407.483 1530.64 408.028 1528.35 409.353L1401 482.806C1394.88 486.334 1392.8 494.092 1396.34 500.203C1399.87 506.313 1407.63 508.392 1413.75 504.864L1541.1 431.412C1547.22 427.884 1549.3 420.125 1545.77 414.015C1543.56 410.195 1539.69 407.949 1535.61 407.665ZM83.7027 483.492C78.7348 483.371 73.9706 486.212 71.8127 491.044C68.9354 497.488 71.8109 504.99 78.2614 507.864L134.756 533.039C141.207 535.913 148.716 533.041 151.593 526.597C154.47 520.153 151.589 512.651 145.139 509.777L88.6492 484.602C87.0379 483.882 85.3585 483.525 83.7027 483.492ZM1572.54 484.015C1570.89 484.045 1569.21 484.409 1567.59 485.126L1511.09 510.257C1504.63 513.128 1501.75 520.625 1504.62 527.071C1507.5 533.517 1515.01 536.399 1521.46 533.53L1577.96 508.393C1584.42 505.525 1587.3 498.025 1584.42 491.579C1582.27 486.744 1577.51 483.917 1572.54 484.015ZM51.0095 562.745C46.0579 563.159 41.6188 566.464 39.9778 571.495C37.7911 578.204 41.4316 585.365 48.1483 587.551L187.961 633.064C194.676 635.248 201.845 631.609 204.033 624.901C206.22 618.193 202.579 611.031 195.862 608.846L56.0496 563.333C54.3717 562.785 52.6598 562.606 51.0095 562.745ZM1605.18 563.289C1603.53 563.138 1601.82 563.32 1600.14 563.876L1460.3 609.29C1453.58 611.472 1449.93 618.63 1452.12 625.341C1454.3 632.051 1461.46 635.696 1468.18 633.514L1608.02 588.1C1614.74 585.919 1618.39 578.76 1616.21 572.05C1614.57 567.017 1610.13 563.709 1605.18 563.289ZM30.641 645.938C24.7017 645.878 19.3754 649.996 18.0907 656.035C16.6218 662.937 21.0043 669.673 27.9118 671.14L88.4181 683.986C95.3265 685.454 102.069 681.075 103.538 674.175C105.007 667.273 100.624 660.536 93.7165 659.07L33.2157 646.224C32.3525 646.042 31.489 645.938 30.641 645.938ZM1625.39 646.059C1624.54 646.066 1623.68 646.18 1622.82 646.331L1562.31 659.172C1555.4 660.639 1551.02 667.37 1552.49 674.272C1553.96 681.173 1560.7 685.554 1567.61 684.089L1628.11 671.248C1635.02 669.781 1639.41 663.045 1637.94 656.143C1636.65 650.104 1631.33 646.009 1625.39 646.059ZM15.224 729.62C9.31201 730.186 4.44582 734.82 3.79646 740.96C3.05443 747.976 8.10689 754.224 15.1304 754.965L161.364 770.411C168.388 771.152 174.642 766.099 175.384 759.082C176.126 752.066 171.068 745.818 164.044 745.077L17.8102 729.631C16.9319 729.54 16.069 729.54 15.224 729.62ZM1640.91 730.719C1640.07 730.628 1639.2 730.628 1638.32 730.729L1492.07 745.977C1485.05 746.709 1479.98 752.948 1480.71 759.966C1481.45 766.984 1487.69 772.044 1494.72 771.311L1640.97 756.063C1647.99 755.331 1653.06 749.092 1652.32 742.074C1651.68 735.934 1646.82 731.293 1640.91 730.719ZM12.7481 815.28C5.68515 815.28 0 820.96 0 828.016C0 835.072 5.68515 840.752 12.7481 840.752H74.6024C81.665 840.752 87.3562 835.072 87.3562 828.016C87.3562 820.96 81.665 815.28 74.6024 815.28H12.7481ZM1581.4 815.28C1574.33 815.28 1568.65 820.96 1568.65 828.016C1568.65 835.072 1574.33 840.752 1581.4 840.752H1643.25C1650.31 840.752 1656 835.072 1656 828.016C1656 820.96 1650.31 815.28 1643.25 815.28H1581.4ZM163.873 884.709C163.028 884.618 162.165 884.618 161.287 884.72L15.0308 899.968C8.00605 900.7 2.94237 906.939 3.6747 913.956C4.40765 920.974 10.6528 926.035 17.6773 925.302L163.933 910.054C170.958 909.321 176.022 903.083 175.289 896.065C174.647 889.924 169.785 885.283 163.873 884.709ZM1492.05 885.611C1486.14 886.176 1481.27 890.811 1480.62 896.95C1479.88 903.967 1484.93 910.215 1491.96 910.956L1638.19 926.402C1645.21 927.143 1651.47 922.09 1652.21 915.073C1652.95 908.056 1647.89 901.809 1640.87 901.068L1494.64 885.622C1493.76 885.531 1492.89 885.53 1492.05 885.611ZM90.971 971.651C90.1229 971.658 89.2598 971.741 88.3966 971.923L27.8903 984.763C20.9816 986.231 16.6021 992.966 18.0692 999.868C19.5381 1006.77 26.2802 1011.15 33.189 1009.68L93.6953 996.845C100.604 995.377 104.983 988.642 103.516 981.74C102.232 975.701 96.9099 971.601 90.971 971.651ZM1565.01 971.772C1559.07 971.711 1553.75 975.824 1552.47 981.863C1551 988.765 1555.38 995.502 1562.28 996.969L1622.79 1009.81C1629.7 1011.28 1636.44 1006.91 1637.91 1000.01C1639.38 993.107 1635 986.365 1628.09 984.898L1567.59 972.052C1566.72 971.87 1565.86 971.772 1565.01 971.772ZM192.858 1021.93C191.207 1021.78 189.503 1021.96 187.824 1022.52L47.9781 1067.94C41.2611 1070.12 37.613 1077.28 39.7964 1083.99C41.9801 1090.7 49.1454 1094.34 55.8624 1092.16L195.703 1046.75C202.42 1044.56 206.073 1037.41 203.89 1030.69C202.251 1025.66 197.809 1022.35 192.858 1021.93ZM1463 1022.39C1458.05 1022.8 1453.61 1026.1 1451.97 1031.14C1449.79 1037.85 1453.43 1045.01 1460.14 1047.19L1599.96 1092.7C1606.67 1094.89 1613.84 1091.25 1616.03 1084.54C1618.22 1077.83 1614.57 1070.67 1607.86 1068.49L1468.04 1022.97C1466.37 1022.43 1464.65 1022.25 1463 1022.39ZM139.494 1121.4C137.837 1121.43 136.16 1121.79 134.547 1122.51L78.0357 1147.64C71.5834 1150.51 68.7037 1158.01 71.5761 1164.46C74.4504 1170.9 81.9548 1173.78 88.4069 1170.91L144.919 1145.78C151.371 1142.91 154.251 1135.41 151.378 1128.97C149.225 1124.13 144.462 1121.3 139.494 1121.4ZM1516.3 1121.89C1511.33 1121.77 1506.57 1124.61 1504.41 1129.44C1501.54 1135.88 1504.41 1143.39 1510.86 1146.26L1567.35 1171.43C1573.8 1174.31 1581.31 1171.44 1584.19 1164.99C1587.06 1158.55 1584.19 1151.05 1577.74 1148.17L1521.25 1123C1519.64 1122.28 1517.96 1121.92 1516.3 1121.89ZM249.518 1149.49C247.071 1149.3 244.544 1149.85 242.25 1151.17L114.905 1224.63C108.788 1228.16 106.708 1235.91 110.239 1242.02C113.771 1248.13 121.537 1250.21 127.653 1246.69L254.999 1173.24C261.115 1169.71 263.195 1161.95 259.664 1155.84C257.456 1152.02 253.598 1149.77 249.518 1149.49ZM1406.49 1149.49C1402.41 1149.76 1398.54 1152.02 1396.34 1155.83C1392.8 1161.95 1394.88 1169.71 1401 1173.24L1528.35 1246.68C1534.46 1250.21 1542.23 1248.13 1545.77 1242.02C1549.3 1235.91 1547.22 1228.15 1541.1 1224.63L1413.75 1151.17C1411.46 1149.85 1408.93 1149.32 1406.49 1149.49ZM217.755 1257.28C215.302 1257.37 212.845 1258.16 210.701 1259.71L160.638 1296C154.921 1300.15 153.657 1308.08 157.803 1313.79C161.951 1319.5 169.891 1320.76 175.608 1316.62L225.677 1280.33C231.394 1276.19 232.658 1268.25 228.511 1262.54C225.919 1258.97 221.842 1257.14 217.755 1257.28ZM1437.94 1257.71C1433.86 1257.55 1429.78 1259.39 1427.19 1262.96C1423.03 1268.67 1424.29 1276.61 1430.01 1280.75L1480.05 1317.08C1485.76 1321.22 1493.7 1319.97 1497.85 1314.26C1502.01 1308.55 1500.75 1300.62 1495.04 1296.47L1445 1260.15C1442.86 1258.59 1440.39 1257.79 1437.94 1257.71ZM331.141 1262.1C327.888 1261.92 324.568 1263.01 321.942 1265.36L212.583 1363.57C207.331 1368.29 206.904 1376.31 211.626 1381.56C216.348 1386.81 224.376 1387.23 229.629 1382.51L338.988 1284.3C344.24 1279.59 344.667 1271.57 339.945 1266.32C337.585 1263.7 334.396 1262.28 331.141 1262.1ZM1324.56 1262.45C1321.3 1262.64 1318.11 1264.04 1315.75 1266.66C1311.02 1271.91 1311.44 1279.93 1316.69 1284.65L1425.98 1382.94C1431.23 1387.66 1439.26 1387.24 1443.99 1381.99C1448.71 1376.75 1448.29 1368.73 1443.04 1364.01L1333.75 1265.72C1331.12 1263.36 1327.81 1262.28 1324.56 1262.45ZM434.889 1355.76C430.802 1355.6 426.723 1357.43 424.126 1361L337.623 1479.79C333.468 1485.5 334.719 1493.44 340.428 1497.59C346.139 1501.74 354.083 1500.49 358.238 1494.78L444.741 1375.99C448.896 1370.28 447.646 1362.35 441.937 1358.19C439.795 1356.64 437.341 1355.84 434.889 1355.76ZM1220.4 1356.29C1217.95 1356.38 1215.49 1357.16 1213.35 1358.72C1207.63 1362.86 1206.37 1370.79 1210.51 1376.51L1296.86 1495.42C1301 1501.13 1308.94 1502.39 1314.66 1498.25C1320.38 1494.1 1321.64 1486.17 1317.5 1480.46L1231.15 1361.55C1228.56 1357.98 1224.49 1356.15 1220.4 1356.29ZM323.219 1374.64C319.964 1374.82 316.773 1376.22 314.41 1378.85L273.023 1424.77C268.297 1430.01 268.715 1438.04 273.965 1442.76C279.214 1447.48 287.242 1447.06 291.968 1441.81L333.36 1395.89C338.086 1390.65 337.662 1382.62 332.415 1377.9C329.789 1375.54 326.473 1374.47 323.219 1374.64ZM1332.7 1374.7C1329.45 1374.52 1326.13 1375.6 1323.51 1377.96C1318.26 1382.68 1317.84 1390.7 1322.56 1395.95L1363.94 1441.88C1368.67 1447.12 1376.7 1447.54 1381.95 1442.82C1387.2 1438.1 1387.62 1430.08 1382.89 1424.83L1341.51 1378.91C1339.15 1376.28 1335.96 1374.87 1332.7 1374.7ZM555.686 1425.64C550.718 1425.52 545.96 1428.36 543.802 1433.19L483.89 1567.35C481.012 1573.79 483.888 1581.3 490.338 1584.17C496.788 1587.05 504.297 1584.17 507.175 1577.73L567.087 1443.57C569.964 1437.13 567.088 1429.63 560.638 1426.75C559.027 1426.03 557.342 1425.67 555.686 1425.64ZM1099.5 1426.01C1097.85 1426.04 1096.17 1426.4 1094.55 1427.11C1088.1 1429.98 1085.21 1437.48 1088.08 1443.92L1147.81 1578.16C1150.68 1584.61 1158.18 1587.49 1164.64 1584.63C1171.09 1581.76 1173.98 1574.27 1171.11 1567.82L1111.38 1433.58C1109.23 1428.74 1104.47 1425.91 1099.5 1426.01ZM450.41 1467.12C446.331 1467.39 442.471 1469.65 440.264 1473.47L409.337 1526.98C405.805 1533.09 407.886 1540.85 414.003 1544.38C420.119 1547.91 427.885 1545.83 431.416 1539.72L462.344 1486.2C465.875 1480.09 463.795 1472.33 457.678 1468.81C455.385 1467.48 452.857 1466.95 450.41 1467.12ZM1205.59 1467.12C1203.14 1466.94 1200.62 1467.49 1198.33 1468.81C1192.21 1472.34 1190.13 1480.09 1193.66 1486.2L1224.59 1539.72C1228.12 1545.83 1235.89 1547.91 1242 1544.38C1248.12 1540.85 1250.2 1533.1 1246.67 1526.98L1215.74 1473.47C1213.53 1469.65 1209.67 1467.4 1205.59 1467.12ZM689.062 1469.04C683.123 1468.98 677.801 1473.09 676.517 1479.13L645.959 1622.83C644.49 1629.73 648.872 1636.47 655.78 1637.93C662.688 1639.4 669.432 1635.02 670.9 1628.12L701.458 1484.42C702.927 1477.52 698.544 1470.78 691.637 1469.32C690.773 1469.14 689.91 1469.04 689.062 1469.04ZM966.487 1469.13C965.639 1469.13 964.782 1469.22 963.918 1469.4C957.009 1470.86 952.623 1477.59 954.086 1484.49L984.54 1628.22C986.003 1635.12 992.744 1639.5 999.654 1638.04C1006.56 1636.58 1010.95 1629.84 1009.49 1622.94L979.027 1479.23C977.746 1473.19 972.426 1469.08 966.487 1469.13ZM828 1483.62C820.937 1483.62 815.251 1489.3 815.251 1496.36V1643.26C815.251 1650.32 820.937 1656 828 1656C835.063 1656 840.748 1650.32 840.748 1643.26V1496.36C840.748 1489.3 835.063 1483.62 828 1483.62ZM593.986 1531.09C589.035 1531.51 584.592 1534.82 582.955 1539.85L563.835 1598.63C561.651 1605.34 565.301 1612.49 572.016 1614.68C578.733 1616.86 585.899 1613.21 588.082 1606.5L607.202 1547.73C609.386 1541.02 605.736 1533.86 599.02 1531.68C597.343 1531.14 595.637 1530.95 593.986 1531.09ZM1061.91 1531.12C1060.26 1530.97 1058.56 1531.15 1056.88 1531.71C1050.16 1533.89 1046.51 1541.05 1048.69 1547.76L1067.81 1606.53C1069.99 1613.24 1077.16 1616.88 1083.87 1614.7C1090.59 1612.52 1094.24 1605.37 1092.06 1598.66L1072.94 1539.89C1071.3 1534.85 1066.87 1531.54 1061.91 1531.12ZM747.978 1563.86C742.066 1564.42 737.196 1569.06 736.55 1575.2L730.085 1636.66C729.346 1643.68 734.406 1649.92 741.43 1650.65C748.455 1651.39 754.705 1646.34 755.444 1639.32L761.909 1577.87C762.648 1570.85 757.588 1564.6 750.564 1563.87C749.686 1563.78 748.823 1563.78 747.978 1563.86ZM907.51 1563.92C906.665 1563.83 905.796 1563.83 904.917 1563.93C897.893 1564.66 892.828 1570.9 893.561 1577.92L899.988 1639.38C900.721 1646.4 906.966 1651.45 913.99 1650.72C921.015 1649.99 926.08 1643.75 925.347 1636.73L918.926 1575.27C918.284 1569.13 913.422 1564.49 907.51 1563.92Z"fill="#017AFF" fill-opacity="0.16" /><circle cx="828.5" cy="827.5" r="51.5" fill="#007AFF" /><path d="M828.5 879.5L1066.5 540L592 540.5L828.5 879.5Z" fill="url(#paint0_linear_14_10)" /><defs><linearGradient id="paint0_linear_14_10" x1="829" y1="540" x2="829" y2="879" gradientUnits="userSpaceOnUse"><stop stop-color="#007AFF" stop-opacity="0" /><stop offset="1" stop-color="#007AFF" stop-opacity="0.32" /></linearGradient></defs></svg>`;

    const elements = {
        direction_angle: () => {
            return document.getElementById("direction-angle");
        },
        compass_arcs: () => {
            return document.getElementById("compass-arcs");
        },
        compass_direction: () => {
            return document.getElementById("compass-direction");
        },
        compass_graphics: () => {
            return document.getElementById("compass-graphics");
        },
        direction_n: () => {
            return document.getElementById("direction-n");
        },
        direction_s: () => {
            return document.getElementById("direction-s");
        },
        direction_e: () => {
            return document.getElementById("direction-e");
        },
        direction_w: () => {
            return document.getElementById("direction-w");
        },
        frame_content: () => {
            return document.getElementById("frame-content");
        },
        toggle_updates: () => {
            return document.getElementById("toggle-updates");
        },
        credits_btn: () => {
            return document.getElementById("Developed-by-KP");
        },
        feedback_frame: () => {
            return document.getElementById("feedback-frame");
        },
        feedback_btn: () => {
            return document.getElementById("feedback-btn");
        },
    };

    class json2html {
        constructor(root) {
            this.root = root;
            this.list = [];
        }
        append(input) {
            this.list.push(input);
            return this;
        }
        render(input = this.list, root = this.root, clearRoot = true) {
            if (clearRoot) root.innerHTML = "";
            input.forEach((item) => {
                for (const key in item) {
                    if (Object.prototype.hasOwnProperty.call(item, key)) {
                        const element = document.createElement(key);
                        const value = item[key];
                        j2h.setAttribute(element, value[0]);
                        if (typeof value[1] == "string") {
                            element.innerHTML = value[1];
                        } else if (typeof value[1] == "object") {
                            if (value[1].length === undefined) {
                                this.render([value[1]], element, false);
                            } else if (value[1].length !== undefined) {
                                this.render(value[1], element, false);
                            }
                        }
                        root.appendChild(element);
                    }
                }
            });
        }
    }
    const j2h = {
        setRoot: (root) => {
            return new json2html(root);
        },
        element: (tagName, attributes = {}, innerHTML = "") => {
            return {
                [tagName]: [attributes, innerHTML],
            };
        },
        setAttribute: (element, attributes) => {
            if (element instanceof json2html) {
                element = element.root;
            }
            if (typeof attributes === "string") {
                element.setAttribute(attributes, "");
            } else if (
                typeof attributes === "object" &&
                attributes.length !== undefined &&
                typeof attributes[0] === "string"
            ) {
                for (let index = 0; index < attributes.length; index++) {
                    const item = attributes[index];
                    element.setAttribute(item, "");
                }
            } else if (attributes.length === undefined) {
                for (const key in attributes) {
                    element.setAttribute(key, attributes[key].toString());
                }
            } else {
                attributes.map((item) => {
                    if (item.length === undefined) {
                        let pairedAttribute = item;
                        for (const key in pairedAttribute) {
                            element.setAttribute(
                                key,
                                pairedAttribute[key].toString()
                            );
                        }
                    } else if (typeof item === "object") {
                        item.map((item) => {
                            element.setAttribute(item, "");
                        });
                    } else {
                        element.setAttribute(item, "");
                    }
                });
            }
            return element;
        },
    };

    const set_compass_frame_content = () => {
        let frame_content = j2h.setRoot(elements.frame_content());
        frame_content
            .append(
                j2h.element("p", { id: "direction-angle" }, `0<sup>o</sup> N`)
            )
            .append(
                j2h.element(
                    "div",
                    { id: "compass-element" },
                    `${compassGraphics}${compassDirections}`
                )
            );
        frame_content.render();
    };

    const set_feedback_frame_content = () => {
        let frame_content = j2h.setRoot(elements.frame_content());
        frame_content.append(
            j2h.element(
                "iframe",
                {
                    id: "feedback-frame",
                    src: "https://docs.google.com/forms/d/e/1FAIpQLScZ5Wc7cxEdVN6Hzjm6JMNkozUgD97pLhhXlaZj_uS1DiQD0A/viewform",
                    frameborder: 0,
                    marginheight: 0,
                    marginwidth: 0,
                },
                "Loading..."
            )
        );
        frame_content.render();
    };

    const directionIcon = `<svg viewBox="0 0 45 45" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="22.4289" cy="33.2655" r="4.88409" fill="#007AFF" /><path d="M22.4289 38.197L45 6L0 6.04742L22.4289 38.197Z"fill="url(#paint0_linear_25_18)" /><defs><linearGradient id="paint0_linear_25_18" x1="22.4763" y1="6" x2="22.4763"y2="38.1496" gradientUnits="userSpaceOnUse"><stop stop-color="#007AFF" stop-opacity="0" /><stop offset="1" stop-color="#007AFF" stop-opacity="0.32" /></linearGradient></defs></svg>`;

    const set_root_frame_content = () => {
        let frame_content = j2h.setRoot(elements.frame_content());
        frame_content
            .append(
                j2h.element("img", {
                    id: "compass-logo",
                    src: "./assets/compass-logo.png",
                    alt: "Compass Logo",
                })
            )
            .append(j2h.element("p", { id: "greetings" }, "Compass by KP"))
            .append(
                j2h.element("div", { class: "feature" }, [
                    j2h.element(
                        "div",
                        { class: "feature-icon" },
                        directionIcon
                    ),
                    j2h.element("div", { class: "feature-content" }, [
                        j2h.element(
                            "div",
                            { class: "feature-title" },
                            "Navigate"
                        ),
                        j2h.element(
                            "div",
                            { class: "feature-description" },
                            "GPS-based compass for navigation and direction finding."
                        ),
                    ]),
                ])
            )
            .append(
                j2h.element("div", { class: "feature" }, [
                    j2h.element(
                        "div",
                        { class: "feature-icon" },
                        j2h.element("img", {
                            src: "https://avatars.githubusercontent.com/u/82671701",
                            alt: "KP",
                        })
                    ),
                    j2h.element("div", { class: "feature-content" }, [
                        j2h.element(
                            "div",
                            { class: "feature-title" },
                            `<a href="https://github.com/patelka2211">Developer</a>`
                        ),
                        j2h.element(
                            "div",
                            { class: "feature-description" },
                            `<a href="https://github.com/patelka2211">Developed in India with ❤️ by <strong>KP</strong></a>`
                        ),
                    ]),
                ])
            )
            .append(
                j2h.element(
                    "div",
                    {
                        id: "share-n-feedback",
                    },
                    [
                        j2h.element(
                            "div",
                            {
                                id: "sharer-btn",
                                onclick:
                                    "try { Sharer.open(); } catch { alert('It appears that the Sharer module has not been fully loaded at this time.'); }",
                            },
                            "Share this page"
                        ),
                        j2h.element("div", { class: "separator" }, "•"),
                        j2h.element(
                            "div",
                            {
                                id: "feedback-btn",
                            },
                            "Give feedback"
                        ),
                    ]
                )
            );
        frame_content.render();
    };

    let watching = false;
    const startWatching = () => (watching = true);
    const stopWatching = () => (watching = false);
    const isWatching = () => {
        return watching;
    };
    const toggleColors = () => {
        [
            elements.direction_angle(),
            elements.compass_direction(),
            elements.compass_graphics(),
        ].forEach((element) => {
            element.classList.toggle("updating");
        });
    };
    const rotateGraphics = (angle) => {
        [
            elements.direction_n(),
            elements.direction_s(),
            elements.direction_e(),
            elements.direction_w(),
        ].forEach((element) => {
            element.style.transform = `rotate(${angle}deg)`;
        });
        [elements.compass_direction(), elements.compass_arcs()].forEach(
            (element) => {
                element.style.transform = `rotate(-${angle}deg)`;
            }
        );
    };
    const rotateCompass = (newAngle, previousAngle, duration = 1) => {
        if (newAngle == previousAngle || !watching) return;
        toggleColors();
        let multiplier = 0,
            difference = Math.abs(newAngle - previousAngle);
        if (newAngle > previousAngle) multiplier = 1;
        else if (newAngle < previousAngle) multiplier = -1;
        if (difference > 180) {
            difference = 360 - difference;
            multiplier *= -1;
        }
        const fps = 90,
            frames = Number((duration * fps).toFixed(0)),
            miliseconds = duration * 1000,
            d_f = (difference / frames) * multiplier;
        for (let index = 0; index < frames; index++)
            setTimeout(() => {
                if (!watching) return;
                previousAngle += d_f;
                if (previousAngle < 0) previousAngle += 360;
                else if (previousAngle >= 360) previousAngle %= 360;
                elements.direction_angle().innerHTML = ((angle) => {
                    return `${angle}<sup>o</sup> ${
                        determineDirectionName(Number(angle)).direction
                    }`;
                })(previousAngle.toFixed(1));
                rotateGraphics(previousAngle.toFixed(1));
            }, index * (1000 / fps));
        setTimeout(() => {
            if (!watching) return;
            toggleColors();
        }, miliseconds - 200);
        setTimeout(() => {
            if (!watching) return;
            previousAngle = Number(previousAngle.toFixed(0));
            if (previousAngle < 0) previousAngle += 360;
            else if (previousAngle >= 360) previousAngle %= 360;
            elements.direction_angle().innerHTML = ((angle) => {
                return `${angle}<sup>o</sup> ${
                    determineDirectionName(angle).direction
                }`;
            })(previousAngle);
            rotateGraphics(previousAngle);
        }, miliseconds);
    };

    let watcher,
        previousPosition,
        previousAngle = 0,
        lock = false;
    const onSuccess = (position) => {
        if (lock) return;
        lock = true;
        setTimeout(() => {
            lock = false;
        }, 1600);
        const currentPosition = {
            lat: Number(position.coords.latitude.toFixed(5)),
            long: Number(position.coords.longitude.toFixed(5)),
        };
        if (!isWatching()) {
            startWatching();
            set_compass_frame_content();
            ((element) => {
                element.innerHTML = "Stop";
                element.onclick = stopWatcher;
            })(elements.toggle_updates());
            elements.credits_btn().classList.add("show");
            previousPosition = currentPosition;
            return;
        }
        const direction = calculateDirection(currentPosition, previousPosition);
        if (direction === null) return;
        rotateCompass(direction.angle, previousAngle);
        previousPosition = currentPosition;
        previousAngle = direction.angle;
    };
    const onFailure = (error) => {
        navigator.geolocation.clearWatch(watcher);
        ((element) => {
            element.classList.add("disable");
            element.innerText = "No access to the location";
            element.onclick = () => {
                alert(error.message);
            };
        })(elements.toggle_updates());
        stopWatching();
    };
    const stopWatcher = () => {
        navigator.geolocation.clearWatch(watcher);
        elements.credits_btn().classList.remove("show");
        ((element) => {
            element.onclick = startWatcher;
            element.innerText = "Start again";
        })(elements.toggle_updates());
        set_root_frame_content();
        elements.feedback_btn().onclick = openFeedbackForm;
        stopWatching();
    };
    const startWatcher = () => {
        watcher = navigator.geolocation.watchPosition(onSuccess, onFailure, {
            enableHighAccuracy: true,
            maximumAge: 0,
            timeout: 5000,
        });
    };
    const openFeedbackForm = () => {
        elements.toggle_updates().onclick = closeFeedbackForm;
        elements.toggle_updates().innerText = "Done";
        set_feedback_frame_content();
    };
    const closeFeedbackForm = () => {
        elements.toggle_updates().onclick = startWatcher;
        elements.toggle_updates().innerText = "Start again";
        set_root_frame_content();
        elements.feedback_btn().onclick = openFeedbackForm;
    };
    if (navigator.geolocation) {
        elements.toggle_updates().onclick = startWatcher;
    } else {
        elements.toggle_updates().classList.add("disable");
        elements.toggle_updates().innerText = "Browser not supported";
        elements.toggle_updates().onclick = () => {
            alert("Location access is not supported by your browser.");
        };
    }
});
