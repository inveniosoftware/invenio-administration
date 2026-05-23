# SPDX-FileCopyrightText: 2022 CERN.
# SPDX-License-Identifier: MIT

"""Mock resource created for testing."""

from flask_resources import ResourceConfig


class MockResource(ResourceConfig):
    """Creates a mock resource for testing."""

    blueprint_name = "mocks"
    url_prefix = "/mocks"
