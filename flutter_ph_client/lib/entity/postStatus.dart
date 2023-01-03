enum PostStatus {
  success('成功'),
  failed('通信失敗'),
  error('エラー'),
  none(''),
  noEnv('envファイルがありません');

  const PostStatus(this.name);
  final String name;
}
