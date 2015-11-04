//
//  koshianIntegrationTests.swift
//  koshianIntegrationTests
//
//  Created by Masahiko Okada on 2015/11/04.
//  Copyright © 2015年 Facebook. All rights reserved.
//

import UIKit
import XCTest

let TIMEOUT_SECONDS: Double = 10


class koshianIntegrationTests: XCTestCase {
  
  var _runner: RCTTestRunner? = nil;
  
  override func setUp() {
    super.setUp()
    let version: NSOperatingSystemVersion = NSProcessInfo.processInfo().operatingSystemVersion
    assert((version.majorVersion == 8 && version.minorVersion >= 3) || version.majorVersion >= 9, "Test should be run")
    self._runner = RCTTestRunner.init(app: "ios/koshianIntegrationTests/js/IntegrationTestsApp", referenceDirectory: FB_REFERENCE_IMAGE_DIR, moduleProvider: nil)
    self._runner!.recordMode = true
  }
  
  override func tearDown() {
    super.tearDown()
  }
  
  func RCT_TEST(name: String) {
    self._runner!.runTest(__FUNCTION__, module: name)
  }
  
  func testTheTester_waitOneFrame() {
    self._runner!.runTest(__FUNCTION__, module: "IntegrationTestHarnessTest", initialProps: ["waitOneFrame": true], expectErrorBlock: {(dummy) -> Bool in true})
  }
  
  func testTheTester_ExpectError() {
    self._runner!.runTest(__FUNCTION__, module: "IntegrationTestHarnessTest", initialProps: ["shouldThrows": true], expectErrorRegex: "because shouldThrows")
  }
  
  func testIntegrationTestHarnessTest() {
    RCT_TEST("IntegrationTestHarnessTest")
  }
  
  func testKeyboardChangeButtonsTest() {
    RCT_TEST("KeyboardChangeButtonsTest")
  }
}