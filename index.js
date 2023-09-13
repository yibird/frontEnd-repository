function compareVersions(v1, v2) {
  // 分割两个版本号
  const arr1 = v1.split(","),
    arr2 = v2.split(",");
  // 获取两个版本号中长度最长的版本号作为遍历次数
  const count = Math.max(arr1.length, arr2.length);

  // 循环
  for (let i = 0; i < count; i++) {
    /**
     * 补零对齐。假设v1为 1.1.1 v2为 1.0,遍历到第三次时由于v2的长度不够,
     * 因此访问arr2[i]时结果为undefined,所以使用 arr2[i] || "0" 进行
     * 补零,补零之后的结果为 1.0.0
     */
    const v1Part = parseInt(arr1[i] || "0", 10);
    const v2Part = parseInt(arr2[i] || "0", 10);

    if (v1Part > v2Part) {
      return 1;
    } else if (v1Part < v2Part) {
      return -1;
    }
    return 0;
  }
}
