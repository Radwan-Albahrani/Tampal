load("@rules_java//java:defs.bzl", "java_library")
package(default_visibility = ["//visibility:public"])

java_library(
    name = "java-maven-lib",
    srcs = glob(["src/main/java/my/huda/tampal/*.java"]),
    deps = [
        "@maven//:org_eclipse_jetty_jetty_server",
        "@maven//:org_eclipse_jetty_jetty_servlet",
        "@maven//:jakarta_servlet_jakarta_servlet_api",
    ],
)

java_binary(
    name = "webserver",
    main_class = "my.huda.tampal.StartJettyWebserver",
    runtime_deps = [":java-maven-lib", ":html"],
)

java_library(
  name = "jetty-server",
  exports = ["@maven//:org_eclipse_jetty_jetty_server"],
)

java_library(
  name = "jetty-servlet",
  exports = ["@maven//:org_eclipse_jetty_jetty_servlet"],
)

java_library(
    name = "html",
    data = ["data/html.txt"],
)
