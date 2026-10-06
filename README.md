# 个人 Clash / Mihomo 分流规则

维护文件：`rules/custom-proxy.yaml`。修改并提交到 main 后，已配置的设备每小时拉取更新。
规则集只写匹配条件，不写策略名称。当前本机通过 RULE-SET 指向 `🚀 节点选择`。

## 新电脑启用

1. 在 Clash Verge Rev 的订阅页面打开全局扩展覆写配置，合入 `clash-verge/global-merge.yaml`。保留自己已有配置；如果代理组名称不同，请修改其中的 proxy。
2. 打开全局扩展脚本，使用 `clash-verge/global-script.js`。如果已有 main 函数，请将逻辑合并进原函数；按需修改 target 为实际代理组名称。
3. 保存并重新应用订阅。使用规则模式。在规则和规则集页面确认 personal-custom-proxy 已加载。
4. 若原订阅的“编辑规则”中有同样的旧规则，在远程规则集加载成功后移除它们，避免本地旧规则继续生效。

## 增加规则

```yaml
payload:
  - DOMAIN-SUFFIX,example.com
  - DOMAIN,api.example.net
```

通过 GitHub 网页编辑 rules/custom-proxy.yaml 并提交即可。新增本地“编辑规则”内容不会自动上传到本仓库。
所有设备可共用匹配条件，但各自的代理组/节点选择仍由本地控制。

公开仓库仅存放分流规则和通用配置示例。不要提交机场订阅链接、节点密码、API secret 或完整订阅文件。
